import styles from './Numbers.module.css'

const rows= 50;
const columns = 100;

const Numbers = () => {

    return(
        <div className={styles.Container}>
            <div className={styles.Field}>
            <table>
                <tbody>
                    {Array.from({ length: rows }).map((_, rowIndex) => (
                    <tr key={rowIndex}>
                        {Array.from({ length: columns }).map((_, colIndex) => (
                        <td key={colIndex}>
                            <span className={styles.Number}>{Math.floor(Math.random() * 10)}</span>
                        </td>
                        ))}
                    </tr>
                    ))}
                </tbody>
            </table>
            </div>
        </div>
        
    )
}

export default Numbers
