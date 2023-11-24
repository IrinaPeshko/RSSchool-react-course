import { useRouter } from 'next/router';
import styles from './CardDetail.module.css';
import Link from 'next/link';

const CardDetail = (props: { spellData }) => {
  const router = useRouter();
  const { page, limit, search } = router.query;
  const data = props.spellData.response;
  const href = search
    ? {
        pathname: '/',
        query: {
          page: page || '1',
          limit: limit || '10',
          search: search || '',
        },
      }
    : {
        pathname: '/',
        query: {
          page: page || '1',
          limit: limit || '10',
        },
      };
  // const dispatch = useAppDispatch();
  // const { data, isLoading } = useGetOneSpellQuery({
  //   id,
  // });

  // useEffect(() => {
  //   dispatch(setIsDetailsLoading(isLoading));
  // }, [isLoading]);

  return (
    <div className={styles.detailsContainer} data-testid="detailsBlock">
      <Link href={href}>
        <div className={styles.closeModal} data-testid="closeDetails"></div>
      </Link>

      {/* {isLoading && (
        <div
          data-testid="DetailedLoadingBlock"
          className={styles.spinner}
        ></div>
      )} */}

      {/* {!isLoading && ( */}
      <h2 className={styles.glow}>{data.name}</h2>
      {data.image ? (
        <img
          className={styles.detailsImg}
          src={data.image}
          alt="spells-image"
        />
      ) : (
        <img
          src="https://static.wikia.nocookie.net/harrypotter/images/4/48/Flipendo_Maxima_HM_Spell_Icon.png"
          alt="spells-image"
          className={styles.detailsImg}
        />
      )}
      <p className={styles.paragraph}>Effect: {data.effect}</p>
      <p className={styles.paragraph}>category: {data.category}</p>
      {data.light ? (
        <p className={styles.paragraph}>light: {data.light}</p>
      ) : (
        <p className={styles.paragraph}>light: emerald, white or sky blue</p>
      )}
      {/* )} */}
    </div>
  );
};

export default CardDetail;
