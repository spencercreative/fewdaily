import React from 'react'
import Head from 'next/head'

function HeadMetadata({title, description, day, type}) {

    if (title !== undefined) {
        var metaTitle = title + ' | Front-End Web Daily'
    } else {
        var metaTitle = 'Front-End Web Daily | News, tips and more delivered daily'
    }

    if (typeof window !== "undefined") {
        var url = window.location.href
        var hostname = window.location.origin
    } else {
        var url = null
        var hostname = null
    }

    if (description !== undefined) {
        var description = description
    } else {
        var description = "Front-end news, tips, and more delivered daily across the web."
    }

    return (
        <Head>
            
            <title>{metaTitle}</title>
            <meta name="title" content={metaTitle} />
            <meta name="og:title" content={metaTitle} />
            <meta name="twitter:title" content={metaTitle} />

            {description !== undefined &&
            <>
                <meta name="description" content={description} />
                <meta name="og:description" content={description} />
                <meta name="twitter:description" content={description} />
            </>
            }

            <meta name="og:url" content={url} />
            <meta name="twitter:url" content={url} />

            {day !== undefined ?
            <>
            <meta name="og:image" content={hostname + '/social-cards/' + day + '.png'} />
            <meta name="og:image:secure_url" content={hostname + '/social-cards/' + day + '.png'} />
            <meta name="twitter:image" content={hostname + '/social-cards/' + day + '.png'} />
            <link rel="apple-touch-icon" sizes="180x180" href={'/favicons/' + day + '/apple-touch-icon.png'}/>
            <link rel="icon" type="image/png" sizes="32x32" href={'/favicons/' + day + '/favicon-32x32.png'}/>
            <link rel="icon" type="image/png" sizes="16x16" href={'/favicons/' + day + '/favicon-16x16.png'}/>
            <link rel="manifest" href={'/favicons/' + day + '/site.webmanifest'}/>
            </>
            :
            <>
            <meta name="og:image" content={hostname + '/social-cards/monday.png'} />
            <meta name="og:image:secure_url" content={hostname + '/social-cards/' + day + '.png'} />
            <meta name="twitter:image" content={hostname + '/social-cards/monday.png'} />
            <link rel="apple-touch-icon" sizes="180x180" href={'/favicons/monday/apple-touch-icon.png'}/>
            <link rel="icon" type="image/png" sizes="32x32" href={'/favicons/monday/favicon-32x32.png'}/>
            <link rel="icon" type="image/png" sizes="16x16" href={'/favicons/monday/favicon-16x16.png'}/>
            <link rel="manifest" href={'/favicons/monday/site.webmanifest'}/>
            </>
            }
            
            {type !== undefined ? <meta name="og:type" content={type} /> : <meta name="og:type" content="website" />}
            
            <meta name="og:locale" content="en_US" />
            <meta name="og:image:type" content="image/png" />
            <meta name="og:image:width" content="1920" />
            <meta name="og:image:height" content="1080" />
            <meta name="og:image:alt" content="Calendar on computer logo for Front-End Web Daily" />
            <meta name="twitter:image:alt" content="Calendar on computer logo for Front-End Web Daily" />
            <meta name="twitter:creator" content="@fewdaily"/>
            <meta name="twitter:site" content="@fewdaily"/>
            <meta name="twitter:card" content="summary_large_image" />
        </Head>
    )
}

export default HeadMetadata