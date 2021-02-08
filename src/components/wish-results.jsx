import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap';
import WishItem from './wish-item'
import WishItemSingle from './wish-item-single'
export default class WishResults extends Component {
  isNewItem(key) {
    return !this.props.inventory[key]
  }

  render() {
    var characterPositionXMap = [];
    characterPositionXMap['Xiao']  = 50;
    characterPositionXMap['Beidou']  = 53;
    characterPositionXMap['Ningguang']  = 58;
    characterPositionXMap['Chongyun']  = 63;
    characterPositionXMap['Bennett']  = 57;

    const { wishes, setView, updateInventory } = this.props
    let characterPercentX = 60;
    const isSingleItem = wishes.length === 1
    return (
      <div className="wish-results">
        <Container>
          <Row className="vh-10">
            <Col xs="12">
              <div className="d-flex justify-content-end mt-2">
                <div onClick={() => {
                  setView('banners');
                  updateInventory(wishes.map(item => Object.assign({}, item)));
                }} className="close-button"></div>
              </div>
            </Col>
          </Row>
          <Row className="vh-90 justify-content-center align-items-center">
            {
              isSingleItem
              ? (
                <WishItemSingle
                item={wishes[0]}
                isNewItem={this.isNewItem(wishes[0].name)}
                characterPercentX={characterPercentX}
                />
              )
              : (
                wishes.sort((item1, item2) => item2.rating - item1.rating).map((item, index) => (
                  <WishItem
                    key={index}
                    item={item}
                    isNewItem={this.isNewItem(item.name)}
                    characterPercentX={characterPositionXMap[item.name] || 50}
                  />
                  ))
              )
            }
          </Row>
        </Container>
      </div>
    )
  }
}
