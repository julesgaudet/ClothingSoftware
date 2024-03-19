function Cercle({ couleur }) {
  return (
    <div
      className={`w-4 h-4 rounded-full bg-${couleur}`}
      style={{ backgroundColor: couleur }}
    ></div>
  );
}

export default function ApercuCouleurs() {
  const couleurs = [
    { id: 1, nom: "#ff5733" },
    { id: 2, nom: "#ffc846" },
    { id: 3, nom: "#33ff57" },
    { id: 4, nom: "#336cff" },
    { id: 5, nom: "#cc33ff" },
    { id: 6, nom: "#ff33e6" },
    { id: 1, nom: "#ff5733" },
    { id: 2, nom: "#ffc846" },
    { id: 3, nom: "#33ff57" },
    { id: 4, nom: "#336cff" },
    { id: 5, nom: "#cc33ff" },
    { id: 6, nom: "#ff33e6" },
  ];
  const maxCouleur = 5;
  const affichageCouleurs = couleurs.slice(0, maxCouleur); // Limite à  maxCouleurs
  const plusDeCouleurs = couleurs.length - maxCouleur; // Calcule le nombre de couleurs en plus

  return (
    <ul className="flex gap-2 items-center justify-start">
      {affichageCouleurs.map((couleur) => (
        <li key={couleur.id}>
          <Cercle couleur={couleur.nom} />
        </li>
      ))}
      {plusDeCouleurs > 0 && (
        <li key="plus">
          <div>+{plusDeCouleurs}</div>
        </li>
      )}
    </ul>
  );
}
