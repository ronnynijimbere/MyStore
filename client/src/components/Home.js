import React from 'react';
import image1 from '../components/images/image1.jpg'
import image2 from '../components/images/image2.jpg'
import image3 from '../components/images/image3.jpg'
import image4 from '../components/images/image4.jpg'
import image5 from '../components/images/image5.jpg'
import image6 from '../components/images/image6.jpg'
import image7 from '../components/images/image7.jpg'
import image8 from '../components/images/image8.jpg'
import image9 from '../components/images/image9.jpg'
import './App.css';

export default () => {
  return (
    <div className="container">
                <div className="row shop-items">
                    <div className="col-sm hotspot-wrapper shop-item">
                        <img 
                          src={image1}
                          alt="suit"
                          className="img-thumbnail img-fluid"
                          /> 
                        <div className="hotspot-text">
                            <span className="shop-item-title">Blazer & Suit Rose.</span><br />
                            <button type="button" className="btn-sm btn-outline-success shop-item-price" style={{ marginBottom: '30px' }}>R1300.00</button>
                        </div>  
                    </div>
                    <div className="col-sm hotspot-wrapper shop-item">
                        <img src={image2}
                          alt="suit2"
                          className="img-thumbnail img-fluid"
                          /> 
                        <div className="hotspot-text">
                            <span className="shop-item-title">Blazer & Suit Light Blue.</span><br/>
                            <button type="button" className="btn-sm btn-outline-success shop-item-price">R1500.00</button>
                        </div>  
                    </div>  
                    <div className="col-sm hotspot-wrapper shop-item"> 
                        <img src={image3}
                          alt="suit3"
                          className="img-thumbnail img-fluid"
                          />
                        <div className="hotspot-text">
                            <span className="shop-item-title">ABlazer & Suit Light Grey.</span><br/>
                            <button type="button" className="btn-sm btn-outline-success shop-item-price">R1200.00</button>
                        </div>
                    </div>       
                </div>
                <div className="row shop-items">    
                    <div className="col-sm hotspot-wrapper shop-item">
                        <img src={image4}
                          alt="blazer1"
                          className="img-thumbnail img-fluid"
                          />
                        <div className="hotspot-text">
                            <span className="shop-item-title">Blazer Dark Grey.</span><br/>
                            <button type="button" className="btn-sm btn-outline-success shop-item-price" style={{ marginBottom: '30px' }}>R750.00</button>
                        </div>
                    </div>       
                    <div className="col-sm hotspot-wrapper shop-item"> 
                        <img src={image5}
                          alt="blazer2"
                          className="img-thumbnail img-fluid"
                          />
                        <div className="hotspot-text">
                            <span className="shop-item-title">Blazer Light Blue.</span><br/>
                            <button type="button" className="btn-sm btn-outline-success shop-item-price">R600.00</button>
                        </div>
                    </div>    
                    <div className="col-sm hotspot-wrapper shop-item">
                        <img src={image6}
                          alt="blazer3"
                          className="img-thumbnail img-fluid"
                          />
                        <div className="hotspot-text">
                            <span className="shop-item-title">Blazer Brown.</span><br/>
                            <button type="button" className="btn-sm btn-outline-success shop-item-price">R800.00</button>
                        </div>
                    </div>       
                </div>
                <div className="row shop-items">                
                    <div className="col-sm hotspot-wrapper shop-item">
                        <img src={image7}
                          alt="shoes1"
                          className="img-thumbnail img-fluid"
                          />
                        <div className="hotspot-text">
                            <span className="shop-item-title">Saint Laurent Shoes.</span><br/>
                            <button type="button" className="btn-sm btn-outline-success shop-item-price" style={{ marginBottom: '30px' }}>R500.00</button>
                        </div>
                    </div>      
                    <div className="col-sm hotspot-wrapper shop-item">
                        <img src={image8}
                          alt="shoes2"
                          className="img-thumbnail img-fluid"
                          />
                        <div className="hotspot-text">
                            <span className="shop-item-title">Gucci Shoes.</span><br/>
                            <button type="button" className="btn-sm btn-outline-success shop-item-price">R900.00</button>
                        </div>
                    </div>     
                    <div className="col-sm hotspot-wrapper shop-item">
                        <img src={image9}
                          alt="shoes3"
                          className="img-thumbnail img-fluid"
                          />
                        <div className="hotspot-text">
                            <span className="shop-item-title">Gucci Slopes.</span><br/>
                            <button type="button" className="btn-sm btn-outline-success shop-item-price">R750.00</button>
                        </div>
                    </div>    
                </div>
            </div>
        )
    }
