import React, { useEffect } from "react";
import { Button } from 'react-bootstrap';

import styles from "../style/tableFooter.css";

const TableFooter = ({ range, setPage, page, slice }) => {
    useEffect(() => {
        if (slice.length < 1 && page !== 1) {
            setPage(page - 1);
        }
    }, [slice, page, setPage]);
    return (
        <div className={`${styles.tableFooter} center`}>
            {range.map((el, index) => (
                <Button
                    key={index} 
                    className={`${styles.button} ${page === el ? styles.activeButton : styles.inactiveButton} btnPaginacao`}
                    onClick={() => setPage(el)}>
                    {el}
                </Button>
            ))}
        </div>
    );
};

export default TableFooter;