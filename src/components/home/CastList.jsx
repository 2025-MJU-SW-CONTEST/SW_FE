import { useMemo, useState } from "react";
import { toImageUrl } from "@/utils/images";
import { useTranslation } from "react-i18next";
import PersonIcon from "@/assets/icon/Navi/PersonIcon";

const PersonCard = ({ person }) => {
  if (!person) return null;

  const name = person.name ?? "이름 미정";
  const roleText =
    person.character && person.character.trim().length > 0
      ? person.character
      : "actor";

  const imgSrc = useMemo(() => {
    if (!person.photoUrl) return null;
    const u = person.photoUrl;
    return typeof u === "string" && u.length > 0 ? u : null;
  }, [person.photoUrl]);

  const [broken, setBroken] = useState(false);

  return (
    <div className="flex flex-col items-center w-auto">
      {imgSrc && !broken ? (
        <img
          src={imgSrc}
          alt={name}
          className="size-10.5 rounded-full object-cover"
          onError={() => setBroken(true)}
        />
      ) : (
        <PersonIcon className="size-10.5 text-font-400" />
      )}
      <p className="mt-1.5 text-xs font-normal text-font-700 truncate leading-6">
        {name}
      </p>
      <p className="text-[11px] text-font-500 text-center">{roleText}</p>
    </div>
  );
};

const CastList = ({ cast = [] }) => {
  const { t } = useTranslation(["description"]);
  const safeCast = Array.isArray(cast) ? cast.filter(Boolean) : [];

  if (safeCast.length === 0) {
    return (
      <div className="text-sm text-font-500">
        {t("description:description_no_cast")}
      </div>
    );
  }

  return (
    <div>
      <div className="flex space-x-6 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400">
        {safeCast.map((p, idx) => (
          <PersonCard
            key={p.id ?? `${p.name ?? "unknown"}-${idx}`}
            person={p}
          />
        ))}
      </div>
    </div>
  );
};

export default CastList;
