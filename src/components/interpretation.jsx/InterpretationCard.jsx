import React from "react";
import { useNavigate } from "react-router-dom";
import ProfileInfo from "./ProfileInfo";
import ContentBody from "./ContentBody";
import HashtagList from "./HashtagList";
import KebabMenu from "../common/KebabMenu";

const InterpretationCard = ({ data, isMine, onDelete, movieId }) => {
  const navigate = useNavigate();

  const handleEditInterpretation = () => {
    if (!data?.id) return;

    navigate(`/interpretation/edit/${data.id}`, {
      state: {
        existingContent: data?.content ?? "",
        interpretationId: data.id,
        movieId,
      },
    });
  };

  const handleDelete = () => {
    if (onDelete && data?.id) onDelete(data.id);
  };

  return (
    <div className="flex flex-col gap-4 w-90 min-w-70 max-w-140 bg-secondary-50 rounded-t-028 p-6 shadow-custom-drop">
      <div className="flex justify-between items-center">
        <ProfileInfo user={data?.author} />
        {isMine && (
          <KebabMenu
            onEdit={handleEditInterpretation}
            onDelete={handleDelete}
          />
        )}
      </div>
      <ContentBody text={data?.content ?? ""} />
      <HashtagList
        hashtags={Array.isArray(data?.hashtags) ? data.hashtags : []}
      />
    </div>
  );
};

export default InterpretationCard;
