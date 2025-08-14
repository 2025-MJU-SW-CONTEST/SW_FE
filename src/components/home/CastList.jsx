const PersonCard = ({ person }) => (
  <div className="flex flex-col items-center w-auto">
    <img
      src={person.photoUrl}
      alt={person.name}
      className="size-10.5 rounded-full object-cover border border-amber-500"
      loading="lazy"
    />
    <p className="mt-1.5 text-xs font-normal text-font-700 truncate leading-6">
      {person.name}
    </p>
    <p className="text-[11px] text-font-500 leading-6">{person.role}</p>
  </div>
);

const CastList = ({ director, cast }) => (
  <div>
    <div className="flex space-x-6 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400">
      <PersonCard person={director} />
      {cast.map((p) => (
        <PersonCard key={p.name} person={p} />
      ))}
    </div>
  </div>
);

export default CastList;
