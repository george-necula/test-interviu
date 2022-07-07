import React, { useCallback, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import skisArray from './objects';
import Product from './Product'

import "./App.css";



function App() {

  const [counts, setCounts] = useState({})
  const [done, setDone] = useState(false)
  const [state, setState] = useState({})
  const [cart, setCart] = useState([])
  useEffect(() => {
    let temp = counts

    skisArray.map(item => {
      if (temp[item.productCategoryName])
        temp[item.productCategoryName]['count'] += 1
      else
        temp[item.productCategoryName] = { 'count': 1 }


    })
    // setCounts(temp)

    Object.keys(temp).map((sports =>
      // console.log(temp[sports])
      skisArray.filter(item => item.productCategoryName == sports).map((item) => {
        if (temp[item.productCategoryName][item.productSubcategoryName]) { }
        // temp[item.productCategoryName][item.productSubcategoryName] = [...temp[item.productCategoryName][item.productSubcategoryName], item]
        else
          temp[item.productCategoryName][item.productSubcategoryName] = []

        // temp[item.productCategoryName]
      })
    ))

    Object.keys(temp).map((sports =>
      Object.keys(temp[sports]).map(subCat => {
        skisArray.filter(item => item.productSubcategoryName == subCat).map(item => {
          // console.log(subCat, item.productSubsubcategoryName)
          if (temp[sports][subCat][item.productSubsubcategoryName])
            temp[sports][subCat][item.productSubsubcategoryName] = [...temp[sports][subCat][item.productSubsubcategoryName], item]
          else
            temp[sports][subCat][item.productSubsubcategoryName] = [item]
        })
      })
    ))
    delete temp.Sports.count
    setCounts(temp)
    console.log('state: ', counts)
    setDone(true)

  }, [])

  // console.log(skisArray.length)
  return (
    <div className="App">
      

      <div className='cart'>
        <p>Cart:</p>
        {
          cart.map(item => {
            return <div className="innerCart">
              <p>{item.productName}</p>
              <button height='0.5rem' onClick={() => {
                setCart(cart.filter(toRemove => toRemove.resourceId != item.resourceId))
                let temp = counts
                temp[item.productCategoryName][item.productSubcategoryName][item.productSubsubcategoryName].push(item)
                setCounts(temp)
                console.log('tes: ', temp[item.productCategoryName][item.productSubcategoryName][item.productSubsubcategoryName])
              }
              }>remove</button>
            </div>
          })
        }
      </div>

      <div className="container">

        {Object.keys(counts).map(cat => {
          return (<div className="Sport">
            <p style={{ gridColumn: 'span 2' }}>{cat}</p>
            {Object.keys(counts[cat]).map(subCat => {
              return (<div className={subCat} >
                <p className="cat">{subCat}</p>
                {Object.keys(counts[cat][subCat]).map(subSubCat => {
                  return (<div className='grid'>
                    <p className="cat">{(subSubCat) ? subSubCat : 'not defined'}</p>
                    {counts[cat][subCat][subSubCat].map((item, index) => {
                      return (
                        <div className="gridItem">
                          <button onClick={() => {
                            let temp = counts
                            console.log('added to cart: ', temp[cat][subCat][subSubCat])
                            delete temp[cat][subCat][subSubCat][index]
                            setCounts(temp)
                            setCart([...cart, item])
                          }}>add to cart</button>
                          <Product
                            productName={item.productName}
                            resourceId={item.resourceId}
                            photoURL={item.productPhotos[0].file}
                            blurb={item.blurb} />
                        </div>
                      )
                    })}
                  </div>)

                })}
              </div>)
              // counts[cat][subCat].map(item => {
              //   console.log(item)
              // })
            })}
          </div>)
        })
        }
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
