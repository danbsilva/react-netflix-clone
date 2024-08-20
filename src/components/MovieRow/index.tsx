import { useState } from 'react';
import './MovieRow.css';

import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

import { MovieType } from '../../types/Movie';

interface MovieRowProps {
    title: string;
    items: MovieType[];
}

export default function MovieRow({ title, items }: MovieRowProps) {

    const [scrollX, setScrollX] = useState(0);

    function handleLeftArrow() {
        let x = scrollX + Math.round(window.innerWidth / 2);
        if (x > 0) {
            x = 0;
        }
        setScrollX(x);
        
    }

    function handleRightArrow() {
        const listW = items.length * 150;
        let x = scrollX - Math.round(window.innerWidth / 2);
        if ((window.innerWidth - listW) > x) {
            x = (window.innerWidth - listW) - 60;
        }
        setScrollX(x);
    }   

    return (
        <div className="movieRow">
            <h2>{title}</h2>

            <div className='movieRow--left' onClick={handleLeftArrow}>
                <NavigateBeforeIcon style={{ fontSize: 50 }} />
            </div>
            <div className='movieRow--right' onClick={handleRightArrow}>
                <NavigateNextIcon style={{ fontSize: 50 }} />
            </div>

            <div className="movieRow--listarea">
                <div className="movieRow--list" style={{
                    marginLeft: scrollX,
                    width: items.length * 150
                }}>
                    {items.length > 0 && items.map((item, key) => (
                        <a href={`/watch/${item.id}`} className='movieRow--watch'>
                            <div key={key} className="movieRow--item">
                                <img src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} alt={item.name} />
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}