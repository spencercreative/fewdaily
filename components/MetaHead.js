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
            <meta property="og:title" content={metaTitle} />
            <meta property="twitter:title" content={metaTitle} />

            {description !== undefined &&
            <>
                <meta name="description" content={description} />
                <meta property="og:description" content={description} />
                <meta property="twitter:description" content={description} />
            </>
            }

            <meta property="og:url" content={url} />
            <meta property="twitter:url" content={url} />

            {day !== undefined ?
            <>
            <meta property="og:image" content={hostname + '/social-cards/' + day + '.png'} />
            <meta property="og:image:secure_url" content={hostname + '/social-cards/' + day + '.png'} />
            <meta property="twitter:image" content={hostname + '/social-cards/' + day + '.png'} />
            <link rel="apple-touch-icon" sizes="180x180" href={'/favicons/' + day + '/apple-touch-icon.png'}/>
            <link rel="icon" type="image/png" sizes="32x32" href={'/favicons/' + day + '/favicon-32x32.png'}/>
            <link rel="icon" type="image/png" sizes="16x16" href={'/favicons/' + day + '/favicon-16x16.png'}/>
            <link rel="manifest" href={'/favicons/' + day + '/site.webmanifest'}/>
            </>
            :
            <>
            <meta property="og:image" content={hostname + '/social-cards/monday.png'} />
            <meta property="og:image:secure_url" content={hostname + '/social-cards/' + day + '.png'} />
            <meta property="twitter:image" content={hostname + '/social-cards/monday.png'} />
            <link rel="apple-touch-icon" sizes="180x180" href={'/favicons/monday/apple-touch-icon.png'}/>
            <link rel="icon" type="image/png" sizes="32x32" href={'/favicons/monday/favicon-32x32.png'}/>
            <link rel="icon" type="image/png" sizes="16x16" href={'/favicons/monday/favicon-16x16.png'}/>
            <link rel="manifest" href={'/favicons/monday/site.webmanifest'}/>
            </>
            }
            
            {type !== undefined ? <meta property="og:type" content={type} /> : <meta property="og:type" content="website" />}
            
            <meta property="og:locale" content="en_US" />
            <meta property="og:image:type" content="image/png" />
            <meta property="og:image:width" content="1920" />
            <meta property="og:image:height" content="1080" />
            <meta property="og:image:alt" content="Calendar on computer logo for Front-End Web Daily" />
            <meta property="twitter:image:alt" content="Calendar on computer logo for Front-End Web Daily" />
            <meta name="twitter:creator" content="@fewdaily"/>
            <meta name="twitter:site" content="@fewdaily"/>
            <meta property="twitter:card" content="summary_large_image" />
        </Head>
    )
}

export default HeadMetadata