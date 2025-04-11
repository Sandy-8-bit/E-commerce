const renderStars = (rating) => {
    let stars = [];
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) {
        stars.push(<img key={i} src="/star.png" alt="Star" className="w-4 h-4" />);
      } else if (rating === i - 0.5) {
        stars.push(<img key={i} src="/Halfstar.png" alt="Half Star" className="w-4 h-4" />);
      } else {
        stars.push(<img key={i} src="/Star-empty.png" alt="No Star" className="w-4 h-4" />);
      }
    }
    return stars;
  };
  
  export default renderStars;
  