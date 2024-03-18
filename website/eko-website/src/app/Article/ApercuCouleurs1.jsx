function Cercle({ couleur }) {
  return (
    <div
      className={`w-5 h-5 rounded-full bg-${couleur}`}
      style={{ backgroundColor: couleur }}
    ></div>
  );
}

export default function ApercuCouleurs() {
  const couleurs = [
    { id: 1, nom: "#ff5733" },
    { id: 2, nom: "#ffc846" },
  ];

  return (
    <ul className="flex gap-2">
      {couleurs.map((couleur) => (
        <li key={couleur.id}>
          <Cercle couleur={couleur.nom} />
        </li>
      ))}
    </ul>
  );
}
