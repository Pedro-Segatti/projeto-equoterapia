import React, { useEffect } from "react";
import { Button } from 'react-bootstrap';
import { BsChevronCompactRight, BsChevronDoubleRight, BsChevronCompactLeft, BsChevronDoubleLeft } from "react-icons/bs";

import styles from "../style/tableFooter.css";

const TableFooter = ({ range, setPage, page, slice }) => {
    useEffect(() => {
        if (slice.length < 1 && page !== 1) {
            setPage(page - 1);
        }
    }, [slice, page, setPage]);
    return (
        <div className={`${styles.tableFooter} center`}>
            {range.length > 0 &&
            <Button key={-1} disabled={page <= 1} className={'btnPaginacao'}
                onClick={() => setPage(1)}>
                <BsChevronDoubleLeft />
            </Button>
            }
            {range.length > 0 &&
            <Button key={0} disabled={page <= 1} className={'btnPaginacao'}
                onClick={() => setPage(page - 1)}>
                <BsChevronCompactLeft />
            </Button>
            }
            {range.map((el, index) => (
                ((index < page + 4 && index > page - 7) &&
                    <Button
                        key={index} disabled={page === el}
                        className={'btnPaginacao'}
                        onClick={() => setPage(el)}>
                        {el}
                    </Button>
                )
            ))}
            {range.length > 0 &&
            <Button key={99999} disabled={page >= range.length} className={'btnPaginacao'}
                onClick={() => setPage(page + 1)}>
                <BsChevronCompactRight />
            </Button>
            }
            {range.length > 0 &&
            <Button key={100000} disabled={page >= range.length} className={'btnPaginacao'}
                onClick={() => setPage(range.length)}> 
                <BsChevronDoubleRight />
            </Button>
            }
            <br />
            {range.length > 0 &&
            <div>Página {page} de {range.length}</div>
            }
        </div>
    );
};

export default TableFooter;