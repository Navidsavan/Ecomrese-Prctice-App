import React from 'react';
 
class RatingPointsStar extends Component {
 
  constructor(props) {
    super(props);
    this.state = {
      starCount: 3.5
    };
  }
 
  onStarRatingPress(rating) {
    this.setState({
      starCount: rating
    });
  }
 
  render() {
    return (
      <StarRating
       type='custom'
        disabled={false}
        maxStars={5}
        rating={this.state.starCount}
        selectedStar={(rating) => this.onStarRatingPress(rating)}

        
       
      />
    );
  }
}
 
export default RatingPointsStar;