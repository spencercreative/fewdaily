export function theNamedDay($date) {
    var d = new Date($date + 'T00:00');
    var weekday = new Array(7);
    weekday[0] = 'sunday';
    weekday[1] = 'monday';
    weekday[2] = 'tuesday';
    weekday[3] = 'wednesday';
    weekday[4] = 'thursday';
    weekday[5] = 'friday';
    weekday[6] = 'saturday';

    var n = weekday[d.getDay()];

    return n;
}

export function stringToSlug($string) {
    return $string.toLowerCase().replace(/[^\w ]+/g,'').replace(/ +/g,'-');
}

export function addAnchors($content) {
    return $string.toLowerCase().replace(/[^\w ]+/g,'').replace(/ +/g,'-');
}

export function splitSections($content) {
    // Split at headings
    var splitContent = $content.split(/(?=<h2>|<h3>|<h4>|<h5>|<h6>)/g);

    // Remove first element if not heading
    if ( !splitContent[0].startsWith('<h2>') && !splitContent[0].startsWith('<h3>') && !splitContent[0].startsWith('<h4>') && !splitContent[0].startsWith('<h5>') && !splitContent[0].startsWith('<h6>') ) {
        splitContent.shift();
    }
    return splitContent;
}

export function getCurrentDay() {
    var d = new Date();
    var weekday = new Array(7);
    weekday[0] = 'sunday';
    weekday[1] = 'monday';
    weekday[2] = 'tuesday';
    weekday[3] = 'wednesday';
    weekday[4] = 'thursday';
    weekday[5] = 'friday';
    weekday[6] = 'saturday';
    return weekday[d.getDay()];
}

export function makeExcerpt($content) {
    // Split at headings
    var s = $content.split(/(?=##|###|####|#####|######)/g);

    // Remove first element if not heading
    if ( !s[0].startsWith('##') ) {
        s.shift();
    }

    var headings = []
    
    //Add only headings to array
    for (var i = 0; i < s.length; i++) {
        var split = s[i].split('\n');
        headings.push(split[0]);
    }

    var headings = headings.join(', ')

    var excerpt = headings.replace(/#/g, '').replace(/\s\,/g,',').trim()

    return excerpt
    
}