//==========================================================================================//
//==========================================================================================//
function Cercle({ couleur }) {
  return (
    <div
      className={`w-4 h-4 rounded-full bg-${couleur}`}
      style={{ backgroundColor: couleur }}
    ></div>
  );
}

//==========================================================================================//
//==========================================================================================//
export default function ApercuCouleurs({ couleurs }) {
  const maxCouleur = 3; //maximum de couleur a afficher
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
