import { useState } from "react";
import { HiOutlineExternalLink } from "react-icons/hi";
import { TiTick } from "react-icons/ti";
import { ImCross } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import { acceptDeclineTask } from "../Redux/Submissionslice";

const Submission = ({ submitItem }) => {
  const [submissionStatus, setStatus] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const dispatch = useDispatch();

  const handleDecline = async (status) => {
    setIsProcessing(true);
    try {
      dispatch(
        acceptDeclineTask({
          submissionId: submitItem?.id,
          status: status,
        })
      );
      setStatus(true); // true means declined
    } catch (error) {
      console.error("Decline failed:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-4 p-2 border rounded-lg w-full">
      {
        <div className="flex flex-col md:flex-row md:items-center gap-4 w-full">
          <p className="text-sm text-black dark:text-white">
            Git Hub:
            <a
              href={submitItem.gitHubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-base font-semibold text-blue-500 dark:text-blue-400 hover:underline inline-flex items-center gap-1 cursor-pointer"
            >
              Repository <HiOutlineExternalLink className="w-4 h-4" />
            </a>
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Submission date: {submitItem.submissionDate}
          </p>
        </div>
      }

      <div className="flex-shrink-0">
        {submitItem.status === "PENDING" ? (
          <div className="flex gap-2 ">
            <button
              onClick={() => handleDecline("COMPLETE")}
              disabled={isProcessing}
              className={`p-2 rounded-md border ${
                isProcessing
                  ? "bg-gray-100 border-gray-300"
                  : "bg-green-50 border-green-200 hover:bg-green-100"
              }`}
            >
              <TiTick
                className={`w-5 h-5 ${
                  isProcessing ? "text-gray-400" : "text-green-500"
                }`}
              />
            </button>
            <button
              onClick={() => handleDecline("DECLINED")}
              disabled={isProcessing}
              className={`p-2 rounded-md border ${
                isProcessing
                  ? "bg-gray-100 border-gray-300"
                  : "bg-red-50 border-red-200 hover:bg-red-100"
              }`}
            >
              <ImCross
                className={`w-4 h-4 ${
                  isProcessing ? "text-gray-400" : "text-red-500"
                }`}
              />
            </button>
          </div>
        ) : submitItem.status === "COMPLETE" ? (
          <span className="inline-flex items-center gap-2 px-3 py-1 text-sm font-medium rounded-md bg-green-100 text-green-800 border border-green-200">
            <TiTick className="w-4 h-4" /> ACCEPTED
          </span>
        ) : (
          <span
            className={`inline-flex items-center gap-2 px-3 py-1 text-sm font-medium rounded-md bg-red-100 text-red-800 border border-red-200 ${
              submitItem.status === "COMPLETE" && "hidden"
            }`}
          >
            <ImCross className="w-4 h-4" /> DECLINED
          </span>
        )}
      </div>
    </div>
  );
};

export default Submission;
