import { useEffect } from 'react';
import Nav from '../Components/Nav/Nav'
import Footer from '../Components/Footer/Footer'

function News({ title }) {

    useEffect(() => {
        document.title = title;
    }, [title])

    return (
        <div>
            <Nav />
            <Footer />
        </div>
    );
}

export default News;
