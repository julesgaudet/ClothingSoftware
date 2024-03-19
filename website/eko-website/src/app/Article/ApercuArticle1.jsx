export default function ApercuArticle1({ nom, photoSrc, prix }) {
  return (
    <div className="col-span-1">
      <img src={photoSrc} alt={nom} className="w-full h-auto" />
    </div>
    
  );
}
