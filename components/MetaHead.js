import React from 'react'
import Head from 'next/head'

function HeadMetadata({title, description, day}) {

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
            <meta property="twitter:image" content={hostname + '/social-cards/' + day + '.png'} />
            </>
            :
            <>
            <meta property="og:image" content={hostname + '/social-cards/monday.png'} />
            <meta property="twitter:image" content={hostname + '/social-cards/monday.png'} />
            </>
            }

            <meta property="og:type" content="website" />
            <meta name="twitter:creator" content="@fewdaily"/>
            <meta property="twitter:card" content="summary_large_image" />
        </Head>
    )
}

export default HeadMetadata