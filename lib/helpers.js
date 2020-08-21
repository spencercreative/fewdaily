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

    const d = new Date(date + 'T12:00');
    const month = d.toLocaleString('default', { month: 'long' });
    var splitDate = date.split('-')

    var year = splitDate[0]
    var day = splitDate[2]

    return month + ' ' + day + ', ' + year
}

export function stringToSlug(string) {
    return string.toLowerCase().replace(/[^\w ]+/g,'').replace(/ +/g,'-');
}

export function stringToHashTag(string) {
    var hashtag = string.toLowerCase().replace(/[^\w ]+/g,'').replace(/ +/g,'');

    return '%23' + hashtag
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

export function getCurrentIso() {
    var d = new Date()
    var isoLong = d.toISOString()
    var iso = isoLong.split('T')[0]
    return iso
}

export function getYesterdayIso() {
    var d = new Date()
    d.setDate(d.getDate() - 1)
    var isoLong = d.toISOString()
    var yesterday = isoLong.split('T')[0]
    return yesterday
}

export function getTomorrowIso() {
    var d = new Date()
    d.setDate(d.getDate() + 1)
    var isoLong = d.toISOString()
    var tomorrow = isoLong.split('T')[0]
    return tomorrow
}

export function listDate(date) {
    if ( date === getCurrentIso() ) {
        return 'Today'
    } else if ( date === getYesterdayIso() ) {
        return 'Yesterday'
    } else {
        return theDateString(date)
    }
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

export function headingList(content) {
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

    for (var i = 0; i < headings.length; i++) {
        headings.splice(i, 1, headings[i].replace(/#/g, '').trim());
    }

    return headings
    
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

export function hashtagList(tags) {
    var hashtags = []
    for (var i = 0; i < tags.length; i++) {
        hashtags.push(stringToHashTag(tags[i]))
    }
    hashtags.push('%23fewdaily', '%23webdev')
    hashtags = hashtags.join(' ')
    return hashtags
}

export function listSearchSort() {
    var searchQuery = document.getElementById('list-search').value.toLowerCase()
    var listItems = document.getElementsByClassName('post-list-item')

    for (var i = 0; i < listItems.length; i++) {
        var content = listItems.item(i).innerText.toLowerCase()
        if ( content.indexOf(searchQuery) !== -1 ) {
            if (searchQuery !== '') {
                listItems.item(i).classList.remove('hidden')
                listItems.item(i).classList.add('flex')
            } else {
                listItems.item(i).classList.remove('hidden')
                listItems.item(i).classList.add('flex')
            }
        } else {
            listItems.item(i).classList.add('hidden')
            listItems.item(i).classList.remove('flex')
        }
    }
    
}