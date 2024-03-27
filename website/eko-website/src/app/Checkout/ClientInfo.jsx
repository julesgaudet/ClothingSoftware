export default function ClientInfo({
  name,
  lastName,
  email,
  country,
  city,
  region,
  zip,
  payment,
  handleName,
}) {
  return (
    <>
      <form>
        <label>Name</label>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => handleName(e.target.value)}
        />
      </form>
    </>
  );
}
