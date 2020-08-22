import React, {useState, useEffect} from 'react'
import RSSParser from 'rss-parser'
import moment from 'moment-timezone'

export const GetEpisode = (props) => {
    const [feed, setFeed] = useState({ items: [] })

    useEffect(() => {
        const CORS_PROXY = "https://cors-anywhere.herokuapp.com/"
        let parser = new RSSParser();
        parser.parseURL(`https://anchor.fm/s/13222050/podcast/rss`, function (err, feed) {
          if (err) throw err;
          setFeed(feed)
        })
      }, [])

    return (
        <>
            {feed.items.map((item, i) => (
                <>
                {moment(item.isoDate).tz('America/New_York')._i.split('T')[0] == props.date &&

                    <div className="border-t border-solid border-gray mt-10 md:mt-16 py-10 print:hidden" key={i}>
                        <h3 className="mt-0 mb-6 leading-none">Listen to the episode!</h3>

                        <div id="podcast-episode" className="relative w-full h-0">

                            <iframe src={'https://anchor.fm/fewdaily/embed/episodes/' + item.link.split("/episodes/")[1]} height="100%" width="100%" frameBorder="0" scrolling="no" className="absolute top-0 left-0 h-full w-full" />

                        </div>
                    </div>
                }
                </>
            ))}
        </>
    );
}