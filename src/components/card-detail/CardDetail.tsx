import styles from './CardDetail.module.css';
import { Suspense } from 'react';
import { Link, useLoaderData, Await } from 'react-router-dom';
import { OneSpellRequest } from '../../types/requests-types';
// import { Http2ServerRequest } from 'http2';

const CardDetail = () => {
  const loaderData = useLoaderData() as OneSpellRequest;
  // const timer = () => {
  //   setTimeout(()=>{return loaderData}, 10000)
  // }
    // const loaderAttributes = loaderData.data.attributes;
    // if (loaderData && <load></load>erAttributes) {
      return (
        <>
          <div className={styles.detailsContainer}>
            <Link to="/">
              <div className={styles.closeModal}></div>
            </Link>
            <Suspense fallback={<h2>Loading...</h2>}>
              <Await resolve={loaderData}>
                {(resolvedData) => (
                  <>
                    <h2>{resolvedData.data.attributes.name}</h2>
                    {resolvedData.data.attributes.image ? (
                      <img
                        className={styles.detailsImg}
                        src={resolvedData.data.attributes.image}
                        alt="spells-image"
                      />
                    ) : (
                      <img
                        src="https://static.wikia.nocookie.net/harrypotter/images/4/48/Flipendo_Maxima_HM_Spell_Icon.png"
                        alt="spells-image"
                      />
                    )}
                    <p className={styles.paragraph}>
                      Effect: {resolvedData.data.attributes.effect}
                    </p>
                    <p className={styles.paragraph}>
                      category: {resolvedData.data.attributes.category}
                    </p>
                    {resolvedData.data.attributes.light ? (
                      <p className={styles.paragraph}>
                        light: {resolvedData.data.attributes.light}
                      </p>
                    ) : (
                      <p className={styles.paragraph}>
                        light: emerald, white or sky blue
                      </p>
                    )}
                  </>
                )}
              </Await>
            </Suspense>
          </div>
        </>
      );
    };

export default CardDetail;
