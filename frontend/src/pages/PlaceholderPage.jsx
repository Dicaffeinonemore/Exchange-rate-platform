function PlaceholderPage({ title, eyebrow, description }) {
  return (
    <div className="placeholder-page">
      <p className="eyebrow">{eyebrow} / COMING NEXT</p>
      <h1>{title}<span>.</span></h1>
      <p>{description}</p>
      <div className="placeholder-note"><span>✦</span> 이 페이지는 다음 버전에서 채워집니다.</div>
    </div>
  );
}

export default PlaceholderPage;
