type RegularButtonTypes = {
  name: string;
};

function RegularButton({ name }: RegularButtonTypes) {
  return (
    <button type="button" className="regular-btn">
      <span className="btn-text">{name}</span>
    </button>
  );
}

export default RegularButton;
