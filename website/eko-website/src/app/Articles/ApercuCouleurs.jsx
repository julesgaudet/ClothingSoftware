function Cercle({ couleur }) {
  return (
    <div
      className={`w-5 h-5 rounded-full bg-${couleur}`}
      style={{ backgroundColor: couleur }}
    ></div>
  );
}

export default function ApercuCouleurs() {
  const couleurs = ["#ff5733", "#ffc846"];

  return (
    <ul className="flex gap-2">
      {couleurs.map((couleur, index) => (
        <li key={index}>
          <Cercle couleur={couleur} />
        </li>
      ))}
    </ul>
  );
}
