import moment from 'moment-timezone';
import JSZip from 'jszip';
import FileSaver from 'file-saver';

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
	var splitDate = date.split('-');

	var year = splitDate[0];
	var day = +splitDate[2];

	return month + ' ' + day + ', ' + year;
}

export function stringToSlug(string) {
	return string
		.toLowerCase()
		.replace(/[^\w ]+/g, '')
		.replace(/ +/g, '-');
}

export function stringToHashTag(string) {
	var hashtag = string
		.toLowerCase()
		.replace(/[^\w ]+/g, '')
		.replace(/ +/g, '');

	return '%23' + hashtag;
}

export function splitSections(content) {
	// Split at headings
	var splitContent = content.split(/(?=<h2>|<h3>|<h4>|<h5>|<h6>)/g);

	// Remove first element if not heading
	if (
		!splitContent[0].startsWith('<h2>') &&
		!splitContent[0].startsWith('<h3>') &&
		!splitContent[0].startsWith('<h4>') &&
		!splitContent[0].startsWith('<h5>') &&
		!splitContent[0].startsWith('<h6>')
	) {
		splitContent.shift();
	}
	return splitContent;
}

export function transcriptText(content) {
	var replaceHeaders = content.replace(/<h2>.*<\/h2>/g, '<p>----</p>');

	return replaceHeaders;
}

export function getCurrentDay() {
	var timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
	var d = new Date();
	var date = moment(d).tz(timezone)._i;
	var weekday = new Array(7);
	weekday[0] = 'sunday';
	weekday[1] = 'monday';
	weekday[2] = 'tuesday';
	weekday[3] = 'wednesday';
	weekday[4] = 'thursday';
	weekday[5] = 'friday';
	weekday[6] = 'saturday';
	return weekday[date.getDay()];
}

export function getCurrentIso() {
	var timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
	var d = new Date();
  var date = moment(d).tz(timezone)._i;
	return moment(date).format('YYYY-MM-DD');
}

export function getYesterdayIso() {
	var timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
	var d = new Date();
	var date = moment(d).tz(timezone)._i;
	date.setDate(date.getDate() - 1);
	var isoLong = date.toISOString();
	var yesterday = isoLong.split('T')[0];
	return yesterday;
}

export function getTomorrowIso() {
	var timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
	var d = new Date();
	var date = moment(d).tz(timezone)._i;
	date.setDate(date.getDate() + 1);
	var isoLong = date.toISOString();
	var tomorrow = isoLong.split('T')[0];
	return tomorrow;

export function removeFuturePosts(posts) {
  for (var i = posts.length - 1; i >= 0; i--) {
    var postDate = posts[i].slug;
    var today = getCurrentIso();

    if (postDate > today) {
      posts.splice(i, 1);
    }
  }
  return posts;
}

export function listDate(date) {
	if (date === getCurrentIso()) {
		return 'Today';
	} else if (date === getYesterdayIso()) {
		return 'Yesterday';
	} else {
		return theDateString(date);
	}
}

export function makeExcerpt(content) {
	// Split at headings
	var s = content.split(/(?=##|###|####|#####|######)/g);

	// Remove first element if not heading
	if (!s[0].startsWith('##')) {
		s.shift();
	}

	var headings = [];

	//Add only headings to array
	for (var i = 0; i < s.length; i++) {
		var split = s[i].split('\n');
		headings.push(split[0]);
	}
	var headings = headings.join(', ');

	var excerpt = headings.replace(/#/g, '').replace(/\s\,/g, ',').trim();

	return excerpt;
}

export function makeExcerptString(content) {
	// Split at headings
	var s = content.split(/(?=##|###|####|#####|######)/g);

	// Remove first element if not heading
	if (!s[0].startsWith('##')) {
		s.shift();
	}

	var headings = [];

	//Add only headings to array
	for (var i = 0; i < s.length; i++) {
		var split = s[i].split('\n');
		headings.push(split[0]);
	}
	var last = headings.pop();
	var headings = headings.join(', ') + ', and ' + last;

	var excerpt = headings.replace(/#/g, '').replace(/\s\,/g, ',').trim();

	return excerpt;
}

export function headingList(content) {
	// Split at headings
	var s = content.split(/(?=##|###|####|#####|######)/g);

	// Remove first element if not heading
	if (!s[0].startsWith('##')) {
		s.shift();
	}

	var headings = [];

	//Add only headings to array
	for (var i = 0; i < s.length; i++) {
		var split = s[i].split('\n');
		headings.push(split[0]);
	}

	for (var i = 0; i < headings.length; i++) {
		headings.splice(i, 1, headings[i].replace(/#/g, '').trim());
	}

	return headings;
}

export function dayTitle(date) {
	var name = theNamedDay(date);

	if (name == 'monday') {
		return 'Monday Medley';
	} else if (name == 'tuesday') {
		return 'Tuesday Tips';
	} else if (name == 'wednesday') {
		return 'Wednesday Wisdom';
	} else if (name == 'thursday') {
		return 'Thursday Thoughts';
	} else if (name == 'friday') {
		return 'Friday Facts';
	} else if (name == 'saturday') {
		return 'Saturday Special';
	} else if (name == 'sunday') {
		return 'Sunday Switch';
	}
}

export function hashtagList(tags) {
	var hashtags = [];
	for (var i = 0; i < tags.length; i++) {
		hashtags.push(stringToHashTag(tags[i]));
	}
	hashtags.push('%23fewdaily', '%23webdev');
	hashtags = hashtags.join(' ');
	return hashtags;
}

export function sortList(s) {
	if (typeof window !== 'undefined') {
		if (s !== undefined) {
			var searchQuery = s;
		} else if (document.getElementById('list-search') !== null) {
			var searchQuery = document
				.getElementById('list-search')
				.value.toLowerCase();
		} else {
			var searchQuery = '';
		}

		var listItems = document.getElementsByClassName('post-list-item');

		// Sort list
		for (var i = 0; i < listItems.length; i++) {
			var content = listItems.item(i).innerText.toLowerCase();
			if (content.indexOf(searchQuery) !== -1) {
				if (searchQuery !== '') {
					listItems.item(i).classList.remove('hidden');
					listItems.item(i).classList.add('flex');
				} else {
					listItems.item(i).classList.remove('hidden');
					listItems.item(i).classList.add('flex');
				}
			} else {
				listItems.item(i).classList.add('hidden');
				listItems.item(i).classList.remove('flex');
			}
		}
	}
}

export function listSearchSort() {
	var searchQuery = document
		.getElementById('list-search')
		.value.toLowerCase();
	var uri = window.location.href.split('?')[0];
	var key = 's';
	var re = new RegExp('([?&])' + key + '=.*?(&|$)', 'i');
	var separator = uri.indexOf('?') !== -1 ? '&' : '?';

	// console.log(uri);

	if (uri.match(re)) {
		var newURL = uri.replace(re, '$1' + key + '=' + searchQuery + '$2');
	} else if (searchQuery === '') {
		var newURL = uri;
	} else {
		var newURL = uri + separator + key + '=' + searchQuery;
	}

	window.history.pushState({ path: newURL }, '', newURL);

	sortList();
}

export function zipImages(containerId, pathname) {
	var zip = new JSZip();
	var folder = zip.folder(pathname);

	if (typeof window !== 'undefined') {
		var images = document
			.getElementById(containerId)
			.querySelectorAll('img');

		if (images.length !== 0) {
			for (var i = images.length - 1; i >= 0; i--) {
				var fileNumber = i + 1 < 10 ? '0' + (i + 1) : i + 1;

				var byteString = atob(images[i].src.split(',')[1]);
				var ab = new ArrayBuffer(byteString.length);
				var ia = new Uint8Array(ab);
				for (var x = 0; x < byteString.length; x++) {
					ia[x] = byteString.charCodeAt(x);
				}

				var blob = new Blob([ab], { type: 'image/jpeg' });

				folder.file(pathname + '_' + fileNumber + '.jpg', blob);
			}

			zip.generateAsync({ type: 'blob' }).then(function (folder) {
				FileSaver.saveAs(folder, pathname + '.zip');
			});
		} else {
			return console.log('No images generated yet!');
		}
	}
}
