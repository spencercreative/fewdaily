export function socialShares(source, url) {
    
    if ( source == 'facebook' ) {
        return 'https://www.facebook.com/sharer/sharer.php?u=' + url
    }

    if ( source == 'twitter' ) {
        return 'https://twitter.com/intent/tweet?url=' + url
    }

    if ( source == 'linkedin' ) {
        return 'https://www.linkedin.com/sharing/share-offsite?url=' + url + '&title=&summary=&source='
    }
}