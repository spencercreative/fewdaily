export function theNamedDay(date) {
    var d = new Date(date + 'T12:00');
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

export function theDateString(date) {

    const d = new Date(date);
    const month = d.toLocaleString('default', { month: 'long' });
    var splitDate = date.split('-')

    var year = splitDate[0]
    var day = splitDate[2]

    return month + ' ' + day + ', ' + year
}

export function stringToSlug(string) {
    return string.toLowerCase().replace(/[^\w ]+/g,'').replace(/ +/g,'-');
}

export function splitSections(content) {
    // Split at headings
    var splitContent = content.split(/(?=<h2>|<h3>|<h4>|<h5>|<h6>)/g);

    // Remove first element if not heading
    if ( !splitContent[0].startsWith('<h2>') && !splitContent[0].startsWith('<h3>') && !splitContent[0].startsWith('<h4>') && !splitContent[0].startsWith('<h5>') && !splitContent[0].startsWith('<h6>') ) {
        splitContent.shift();
    }
    return splitContent;
}

export function transcriptText(content) {
    var replaceHeaders = content.replace(/<h2>.*<\/h2>/g, '<p>----</p>');

    return replaceHeaders
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

export function makeExcerpt(content) {
    // Split at headings
    var s = content.split(/(?=##|###|####|#####|######)/g);

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

export function dayTitle(date) {
    var name = theNamedDay(date);

    if (name == 'monday') {
        return 'Monday Medley'
    } else if (name == 'tuesday') {
        return 'Tuesday Tips'
    } else if (name == 'wednesday') {
        return 'Wednesday Wisdom'
    } else if (name == 'thursday') {
        return 'Thursday Thoughts'
    } else if (name == 'friday') {
        return 'Friday Facts'
    } else if (name == 'saturday') {
        return 'Saturday Special'
    } else if (name == 'sunday') {
        return 'Sunday Switch'
    }
}