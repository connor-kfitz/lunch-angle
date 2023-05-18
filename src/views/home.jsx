import { useState } from 'react';

import Wheel from '../components/wheel';

export default function Home() {

    const [categories, setCategories] = useState([]);

    function updateCategoires() {
        setCategories([
            {title: 'Hibachi Grill',
             backgroundColor: 'red',
             position: 0},
             {title: 'McDonalds',
             backgroundColor: 'blue',
             position: 90},
             {title: 'Lazeez',
             backgroundColor: 'purple',
             position: 180},
             {title: 'Dragon Rolls',
             backgroundColor: 'orange',
             position: 270}
        ])
    }

    return (
        <div className="home" onClick={() => updateCategoires()}>
            <Wheel categories={categories}></Wheel>
        </div>
    );
}