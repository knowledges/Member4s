/**
 * 日期控件
 */
(function($) {
    $.Zebra_DatePicker = function(element, options) {
        var defaults = {
            days: ['日', '一', '二', '三', '四', '五', '六'],
            direction: 0,
            disabled_dates: false,
            first_day_of_week: 1,
            format: 'Y-m-d',
            months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
            offset: [0, -5],
            readonly_element: true,
            show_week_number: false,
            view: 'days',
            weekend_days: [0, 6]
        };
        var view, datepicker, icon, header, daypicker, monthpicker, yearpicker, current_system_month, current_system_year, title_year,
            current_system_day, first_selectable_month, first_selectable_year, first_selectable_day, selected_month,
            selected_year, default_day, default_month, default_year, disabled_dates, shim, direction, last_selectable_date;
        var plugin = this;
        plugin.settings = {};
        var $element = $(element);
        var init = function() {
            plugin.settings = $.extend({}, defaults, options);
            // save the default view for later
            view = plugin.settings.view;
            // create the calendar icon
            var html = '<button type="button" class="Zebra_DatePicker_Icon">Pick a date</button>';
            // convert to a jQuery object
            icon = $(html);
            // a reference to the icon, as a global property
            plugin.icon = icon;
            //full screen mask,if not need,delete this
            var shell = '<div id="fullmask"></div>';
            //a reference to the shell ,as a global property
            plugin.shell = $(shell);
            //append the element to th shell
            $element.appendTo(plugin.shell);
            //append the shell to body
            $("body").append(plugin.shell);
            // the calendars direction
            direction =
            // future-only
            (!$.isArray(plugin.settings.direction) && (plugin.settings.direction === true || to_int(plugin.settings.direction) > 0)) || ($.isArray(plugin.settings.direction) && plugin.settings.direction.length == 2 && (plugin.settings.direction[0] === true || to_int(plugin.settings.direction[0]) > 0)) ? true :
            // past-only
            (!$.isArray(plugin.settings.direction) && (plugin.settings.direction === false || to_int(plugin.settings.direction) < 0)) || ($.isArray(plugin.settings.direction) && plugin.settings.direction.length == 2 && (plugin.settings.direction[0] === false || to_int(plugin.settings.direction[0]) < 0)) ? false :
            // no restrictions
            0;
            // by default, we assume that the first selectable date is the current system date
            var date = new Date();
            // extract the date parts
            // also, save the current system month/day/year - we'll use them to highlight the current system date
            first_selectable_month = date.getMonth();
            current_system_month = date.getMonth();
            first_selectable_year = date.getFullYear();
            current_system_year = date.getFullYear();
            first_selectable_day = date.getDate();
            current_system_day = date.getDate();
            // generate the container that will hold everything
            var html = '' + '<div class="Zebra_DatePicker">' + '<div class="dp_div_"><br /></div>' + '<table class="dp_header">' + '<tr>' + '<td class="dp_previous"><</td>' + '<td class="dp_caption">&nbsp;</td>' + '<td class="dp_next">></td>' + '</tr>' + '</table>' + '<table class="dp_daypicker"></table>' + '<table class="dp_monthpicker"></table>' + '<table class="dp_yearpicker"></table>' + '</div>';
            // create a jQuery object out of the HTML above and create a reference to it
            datepicker = $(html);
            // a reference to the calendar, as a global property
            plugin.datepicker = datepicker;
            // create references to the different parts of the date picker
            // create references to the different parts of the date picker
            title_year = datepicker.find('dp_years').first();
            header = datepicker.find('table.dp_header').first();
            daypicker = datepicker.find('table.dp_daypicker').first();
            monthpicker = datepicker.find('table.dp_monthpicker').first();
            yearpicker = datepicker.find('table.dp_yearpicker').first();
            // by default, only clicking the calendar icon shows the date picker
            // if text box is readonly
            // clicking the text box will also show the date picker
            // attach the click event
            (plugin.settings.readonly_element ? icon.add($element) : icon).ready(function(e) {
                selected_month = first_selectable_month;
                selected_year = first_selectable_year;
                plugin.show();
            });
            icon.insertAfter(element);
            // inject the container into the DOM
            $(element).append(datepicker);
            // prevent text highlighting for the text in the header
            // (for the case when user keeps clicking the "next" and "previous" buttons)
            disable_text_select(header.find('td'));
            // event for when clicking the "previous" button
            header.find('.dp_previous').bind('click', function() {
                // if button is not disabled
                if (!$(this).hasClass('dp_blocked')) {
                    // if view is "months"
                    // decrement year by one
                    if (view == 'months') selected_year--;
                    // if view is "years"
                    // decrement years by 12
                    else if (view == 'years') selected_year -= 12;
                    // if view is "days"
                    // decrement the month and
                    // if month is out of range
                    else if (--selected_month < 0) {
                        // go to the last month of the previous year
                        selected_month = 11;
                        selected_year--;
                    }
                    // generate the appropriate view
                    manage_views();
                }
            });
            // event for when clicking the "next" button
            header.find('.dp_next').bind('click', function() {
                // if button is not disabled
                if (!$(this).hasClass('dp_blocked')) {
                    // if view is "months"
                    // increment year by 1
                    if (view == 'months') selected_year++;
                    // if view is "years"
                    // increment years by 12
                    else if (view == 'years') selected_year += 12;
                    // if view is "days"
                    // increment the month and
                    // if month is out of range
                    else if (++selected_month == 12) {
                        // go to the first month of the next year
                        selected_month = 0;
                        selected_year++;
                    }
                    // generate the appropriate view
                    manage_views();
                }
            });
            //bind click event on the shell, click it to close
            $('#fullmask').unbind("click").bind("click",function(event){
                if($(event.target).attr("id") != "fullmask"){
                    return;
                }
                $(event.currentTarget).css({opacity: 1.0, visibility: "hidden"}).stop().animate({opacity: 0}, 200);
            });

            // parse the rules for disabling dates and turn them into arrays of arrays
            // array that will hold the rules for disabling dates
            disabled_dates = [];
            // iterate through the rules for disabling dates
            $.each(plugin.settings.disabled_dates, function() {
                // split the values in rule by white space
                var rules = this.split(' ');
                // there can be a maximum of 4 rules (days, months, years and, optionally, day of the week)
                for (var i = 0; i < 4; i++) {
                    // if one of the values is not available
                    // replace it with a * (wildcard)
                    if (!rules[i]) rules[i] = '*';
                    // if rule contains a comma, create a new array by splitting the rule by commas
                    // if there are no commas create an array containing the rule's string
                    rules[i] = ($.inArray(',', rules[i]) > -1 ? rules[i].split(',') : new Array(rules[i]));
                    // iterate through the items in the rule
                    for (var j = 0; j < rules[i].length; j++) {
                        // if item contains a dash (defining a range)
                        if ($.inArray('-', rules[i][j]) > -1) {
                            // get the lower and upper limits of the range
                            var limits = rules[i][j].match(/^([0-9]+)\-([0-9]+)/);
                            // if range is valid
                            if (null != limits) {
                                // iterate through the range
                                for (var k = to_int(limits[1]); k <= to_int(limits[2]); k++) {
                                    // if value is not already among the values of the rule
                                    // add it to the rule
                                    if ($.inArray(k, rules[i]) == -1) rules[i].push(k + '');
                                }
                                // remove the range indicator
                                rules[i].splice(j, 1);
                            }
                        }
                    }
                    // iterate through the items in the rule
                    // and make sure that numbers are numbers
                    for (j = 0; j < rules[i].length; j++) rules[i][j] = (isNaN(to_int(rules[i][j])) ? rules[i][j] : to_int(rules[i][j]));
                }
                // add to the list of processed rules
                disabled_dates.push(rules);
            });
        };
        /**
         *  Shows the date picker.
         *
         *  @return void
         */
        plugin.show = function() {
            // generate the appropriate view
            manage_views();
            var
            // get the date picker width and height
                datepicker_width = datepicker.outerWidth(),
                datepicker_height = datepicker.outerHeight(),
                // compute the date picker's default left and top
                left = icon.offset().left + plugin.settings.offset[0],
                top = icon.offset().top - datepicker_height + plugin.settings.offset[1],
                // get browser window's width and height
                window_width = $(window).width(),
                window_height = $(window).height(),
                // get browser window's horizontal and vertical scroll offsets
                window_scroll_top = $(window).scrollTop(),
                window_scroll_left = $(window).scrollLeft();
            // if date picker is outside the viewport, adjust its position so that it is visible
            if (left + datepicker_width > window_scroll_left + window_width) left = window_scroll_left + window_width - datepicker_width;
            if (left < window_scroll_left) left = window_scroll_left;
            if (top + datepicker_height > window_scroll_top + window_height) top = window_scroll_top + window_height - datepicker_height;
            if (top < window_scroll_top) top = window_scroll_top;
            // make the date picker visible
            datepicker.css({
                'left': left,
                'top': top
            });
            // fade-in the date picker
            datepicker.fadeIn(150, 'linear');
        };
        /**
         *  Checks if a string represents a valid date according to the format defined by the "format" property.
         *
         *  @param  string  str_date    A string representing a date, formatted accordingly to the "format" property.
         *                              For example, if "format" is "Y-m-d" the string should look like "2011-06-01"
         *
         *  @return boolean             Returns TRUE if string represents a valid date according formatted according to
         *                              the "format" property or FALSE otherwise.
         *
         *  @access private
         */
        //显示内容
        var check_date = function(str_date) {
                // if value is given
                if ($.trim(str_date) != '') {
                    var
                    // prepare the format by removing white space from it
                    // and also escape characters that could have special meaning in a regular expression
                        format = escape_regexp(plugin.settings.format.replace(/\s/g, '')),
                        // allowed characters in date's format
                        format_chars = ['d', 'D', 'j', 'l', 'N', 'S', 'w', 'F', 'm', 'M', 'n', 'Y', 'y'],
                        // "matches" will contain the characters defining the date's format
                        matches = new Array,
                        // "rexeps" will contain the regular expression built for each of the characters used in the date's format
                        regexp = new Array;
                    // iterate through the allowed characters in date's format
                    for (var i = 0; i < format_chars.length; i++)
                    // if character is found in the date's format
                        if ((position = format.indexOf(format_chars[i])) > -1)
                        // save it, alongside the character's position
                            matches.push({
                            character: format_chars[i],
                            position: position
                        });
                        // sort characters defining the date's format based on their position, ascending
                    matches.sort(function(a, b) {
                        return a.position - b.position
                    });
                    // iterate through the characters defining the date's format
                    $.each(matches, function(index, match) {
                        // add to the array of regular expressions, based on the character
                        switch (match.character) {
                            case 'd':
                                regexp.push('0[1-9]|[12][0-9]|3[01]');
                                break;
                            case 'D':
                                regexp.push('[a-z]{3}');
                                break;
                            case 'j':
                                regexp.push('[1-9]|[12][0-9]|3[01]');
                                break;
                            case 'l':
                                regexp.push('[a-z]+');
                                break;
                            case 'N':
                                regexp.push('[1-7]');
                                break;
                            case 'S':
                                regexp.push('st|nd|rd|th');
                                break;
                            case 'w':
                                regexp.push('[0-6]');
                                break;
                            case 'F':
                                regexp.push('[a-z]+');
                                break;
                            case 'm':
                                regexp.push('0[1-9]|1[012]+');
                                break;
                            case 'M':
                                regexp.push('[a-z]{3}');
                                break;
                            case 'n':
                                regexp.push('[1-9]|1[012]');
                                break;
                            case 'Y':
                                regexp.push('[0-9]{4}');
                                break;
                            case 'y':
                                regexp.push('[0-9]{2}');
                                break;
                        }
                    });
                    // if we have an array of regular expressions
                    if (regexp.length) {
                        // we will replace characters in the date's format in reversed order
                        matches.reverse();
                        // iterate through the characters in date's format
                        $.each(matches, function(index, match) {
                            // replace each character with the appropriate regular expression
                            format = format.replace(match.character, '(' + regexp[regexp.length - index - 1] + ')');
                        });
                        // the final regular expression
                        regexp = new RegExp('^' + format + '$', 'ig');
                        // if regular expression was matched
                        if ((segments = regexp.exec(str_date.replace(/\s/g, '')))) {
                            // check if date is a valid date (i.e. there's no February 31)
                            var original_day,
                                original_month,
                                original_year,
                                english_days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
                                english_months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                                iterable,
                                // by default, we assume the date is valid
                                valid = true;
                            // reverse back the characters in the date's format
                            matches.reverse();
                            // iterate through the characters in the date's format
                            $.each(matches, function(index, match) {
                                // if the date is not valid, don't look further
                                if (!valid) return true;
                                // based on the character
                                switch (match.character) {
                                    case 'm':
                                    case 'n':
                                        // extract the month from the value entered by the user
                                        original_month = to_int(segments[index + 1]);
                                        break;
                                    case 'd':
                                    case 'j':
                                        // extract the day from the value entered by the user
                                        original_day = to_int(segments[index + 1]);
                                        break;
                                    case 'D':
                                    case 'l':
                                    case 'F':
                                    case 'M':
                                        // if day is given as day name, we'll check against the names in the used language
                                        if (match.character == 'D' || match.character == 'l') iterable = plugin.settings.days;
                                        // if month is given as month name, we'll check against the names in the used language
                                        else iterable = plugin.settings.months;
                                        // by default, we assume the day or month was not entered correctly
                                        valid = false;
                                        // iterate through the month/days in the used language
                                        $.each(iterable, function(key, value) {
                                            // if month/day was entered correctly, don't look further
                                            if (valid) return true;
                                            // if month/day was entered correctly
                                            if (segments[index + 1].toLowerCase() == value.substring(0, (match.character == 'D' || match.character == 'M' ? 3 : value.length)).toLowerCase()) {
                                                // extract the day/month from the value entered by the user
                                                switch (match.character) {
                                                    case 'D':
                                                        segments[index + 1] = english_days[key].substring(0, 3);
                                                        break;
                                                    case 'l':
                                                        segments[index + 1] = english_days[key];
                                                        break;
                                                    case 'F':
                                                        segments[index + 1] = english_months[key];
                                                        original_month = key + 1;
                                                        break;
                                                    case 'M':
                                                        segments[index + 1] = english_months[key].substring(0, 3);
                                                        original_month = key + 1;
                                                        break;
                                                }
                                                // day/month value is valid
                                                valid = true;
                                            }
                                        });
                                        break;
                                    case 'Y':
                                        // extract the year from the value entered by the user
                                        original_year = to_int(segments[index + 1]);
                                        break;
                                    case 'y':
                                        // extract the year from the value entered by the user
                                        original_year = '19' + to_int(segments[index + 1]);
                                        break;
                                }
                            });
                            // if everything is ok so far
                            if (valid) {
                                // generate a Date object using the values entered by the user
                                var date = new Date(original_year, original_month - 1, original_day);
                                // if, after that, the date is the same as the date entered by the user
                                if (date.getFullYear() == original_year && date.getDate() == original_day && date.getMonth() == (original_month - 1))
                                // return the date as JavaScript date object
                                    return date;
                            }
                        }
                    }
                    // if script gets this far, return false as something must've went wrong
                    return false;
                }
            }
            /**
             *  Prevents the possibility of selecting text on a given element. Used on the "previous" and "next" buttons
             *  where text might get accidentally selected when user quickly clicks on the buttons.
             *
             *  Code by http://chris-barr.com/index.php/entry/disable_text_selection_with_jquery/
             *
             *  @param  jQuery Element  el  A jQuery element on which to prevents text selection.
             *
             *  @return void
             *
             *  @access private
             */
            //显示上一页下一页的内容
        var disable_text_select = function(el) {
                el.css('MozUserSelect', 'none');
                el.bind('selectstart', function() {
                    return false
                });
                el.mousedown(function() {
                    return false
                });
            }
            /**
             *  Generates the day picker view, and displays it
             *
             *  @return void
             *
             *  @access private
             */
        var generate_daypicker = function() {
            var
            // get the number of days in the selected month
                days_in_month = new Date(selected_year, selected_month + 1, 0).getDate(),
                // get the selected month's starting day (from 0 to 6)
                first_day = new Date(selected_year, selected_month, 1).getDay(),
                // how many days are there in the previous month
                days_in_previous_month = new Date(selected_year, selected_month, 0).getDate(),
                // how many days are there to be shown from the previous month
                days_from_previous_month = first_day - plugin.settings.first_day_of_week;
            // manage header caption and enable/disable navigation buttons if necessary
            manage_header('<span style="font-size:16px; font-weight:700;">' + selected_year + '</span><br /><span style="color:#7c8846;font-size:18px; font-weight:700;">' + plugin.settings.months[selected_month] + '</span>'); //显示标题上的月，年
            // start generating the HTML
            var html = '<tr>';
            // if a column featuring the number of the week is to be shown
            if (plugin.settings.show_week_number)
            // column title
                html += '<th>' + plugin.settings.show_week_number + '</th>';
            // name of week days
            // show only the first two letters
            // and also, take in account the value of the "first_day_of_week" property
            for (var i = 0; i < 7; i++) html += '<th>' + plugin.settings.days[(plugin.settings.first_day_of_week + i) % 7].substr(0, 2) + '</th>';
            html += '</tr><tr>';
            // the calendar shows a total of 42 days
            for (var i = 0; i < 42; i++) {
                // seven days per row
                if (i > 0 && i % 7 == 0) html += '</tr><tr>';
                // if week number is to be shown
                if (i % 7 == 0 && plugin.settings.show_week_number) {
                    var
                    // first day of the year
                        first_day_of_year = new Date(selected_year, 0, 1),
                        // current date
                        current_date = new Date(selected_year, selected_month, i),
                        // compute the current week's number
                        week_number = Math.ceil((((current_date - first_day_of_year) / 86400000) + current_date.getDay() + 1) / 7);
                    // add week number
                    html += '<td class="dp_week_number">' + week_number + '</td>';
                }
                // the number of the day in month
                var day = (i - days_from_previous_month + 1);
                // if this is a day from the previous month//上个月的天数
                if (i < days_from_previous_month) html += '<td class="dp_not_in_month"> </td>';
                // if this is a day from the next month////下个月的天数
                else if (day > days_in_month) html += '<td class="dp_not_in_month"> </td>';
                // if this is a day from the current month
                else {
                    var
                    // get the week day (0 to 6, Sunday to Saturday)
                        weekday = (plugin.settings.first_day_of_week + i) % 7,
                        // current date, as an integer in the form of YYYYMMDD
                        now = to_int(str_concat(selected_year, str_pad(selected_month, 2), str_pad(day, 2)));
                    class_name = '';
                    // if date needs to be disabled
                    if (
                        // current date is in the array of disabled dates
                        is_disabled(now) ||
                        // a date span exists
                        (undefined != last_selectable_date && (
                            // and date is outside the limit
                            (plugin.settings.direction[0] > 0 && now > last_selectable_date) || (plugin.settings.direction[0] <= 0 && now < last_selectable_date))))
                    // if day is in weekend
                        if ($.inArray(weekday, plugin.settings.weekend_days) > -1) class_name = 'dp_weekend_disabled';
                        // if work day
                        else class_name += ' dp_disabled';
                        // if there are no direction restrictions
                    else {
                        // if day is in weekend
                        if ($.inArray(weekday, plugin.settings.weekend_days) > -1) class_name = 'dp_weekend data_reducible';
                        else class_name += 'dp_weekday data_reducible';
                    }
                    // print the day of the month
                    var d = now = to_int(str_concat(selected_year, str_pad(selected_month + 1, 2), str_pad(day, 2)));
                    html += '<td date=' + d + (class_name != '' ? ' class="' + $.trim(class_name) + '"' : '') + '>' + str_pad(day, 2) + '<br/></td>';
                }
            }
            // wrap up generating the day picker
            html += '</tr>';
            // inject the day picker into the DOM
            daypicker.html($(html));
            // make the day picker visible
            daypicker.css('display', '');
            //添加页面渲染完成后的回调方法，实现表格内的元素填充,返回所有的可见td元素对象，页面实现数据的筛选和填充
            if ($.isFunction(plugin.settings.showcallback)) {
                plugin.settings.showcallback(daypicker.find("tbody>tr>.data_reducible"));
            }
            //添加每个元素的点击事件，回调方法调用方实现，返回当前点击的td元素的jq对象
            if ($.isFunction(plugin.settings.showcallback)) {
                daypicker.find("tbody>tr>.data_reducible").unbind("click").click(function(event) {
                    plugin.settings.clickcallback($(this));
                });
            };
        };
        /**
         *  Checks if, according to the direction of the calendar and/or the values defined by the "disabled_dates"
         *  property, a day, a month or a year needs to be disabled.
         *
         *  @param  integer now     An integer representing the value that needs to be checked.
         *
         *                          A value in the form of YYYYMMDD will validate a date;
         *                          A value in the form of YYYYMM will validate a month;
         *                          A value in the form of YYYY will validate a year;
         *
         *  @return boolean         Returns TRUE if the given value is valid or FALSE otherwise
         *
         *  @access private
         */
        var is_disabled = function(now) {
            // if there is a direction restriction
            if (direction !== 0) {
                // get the length of the argument
                var len = (now + '').length;
                // if we're checking days
                if (len == 8 && (
                    // calendar is future-only but current day is before the first selectable day
                    (direction && now < str_concat(first_selectable_year, str_pad(first_selectable_month, 2), str_pad(first_selectable_day, 2))) ||
                    // calendar is past-only but current day is after the last selectable day
                    (!direction && now > str_concat(first_selectable_year, str_pad(first_selectable_month, 2), str_pad(first_selectable_day, 2)))
                    // day needs to be disabled
                )) return true;
                // if we're checking months
                else if (len == 6 && (
                    // calendar is future-only but current month has no selectable days
                    (direction && now < str_concat(first_selectable_year, str_pad(first_selectable_month, 2))) ||
                    // calendar is past-only but current month has no selectable days
                    (!direction && now > str_concat(first_selectable_year, str_pad(first_selectable_month, 2)))
                    // month needs to be disabled
                )) return true;
                // if we're checking years
                else if (len == 4 && (
                    // calendar is future-only but current year has no selectable days
                    (direction && now < first_selectable_year) ||
                    // calendar is past-only but current yar has no selectable days
                    (!direction && now > first_selectable_year)
                    // year needs to be disabled
                )) return true;
            }
            // if there are rules for disabling dates
            if (disabled_dates) {
                // convert the argument to a string
                now = now + '';
                // extract the year and the month from "now"
                var year = to_int(now.substr(0, 4)),
                    month = to_int(now.substr(4, 2)) + 1,
                    day = to_int(now.substr(6, 2)),
                    // by default, we assume the day/month/year is not to be disabled
                    disabled = false;
                // iterate through the rules for disabling dates
                $.each(disabled_dates, function() {
                    // if the date is to be disabled, don't look any further
                    if (disabled) return;
                    var rule = this;
                    // if the rules apply for the current year
                    if ($.inArray(year, rule[2]) > -1 || $.inArray('*', rule[2]) > -1)
                    // if the rules apply for the current month
                        if ((undefined != month && $.inArray(month, rule[1]) > -1) || $.inArray('*', rule[1]) > -1)
                        // if the rules apply for the current day
                            if ((undefined != day && $.inArray(day, rule[0]) > -1) || $.inArray('*', rule[0]) > -1) {
                            // if day is to be disabled whatever the day
                            // don't look any further
                            if (rule[3] == '*') return (disabled = true);
                            // get the weekday
                            var weekday = new Date(year, month - 1, day).getDay();
                            // if weekday is to be disabled
                            // don't look any further
                            if ($.inArray(weekday, rule[3]) > -1) return (disabled = true);
                        }
                });
                // if the day/month/year needs to be disabled
                if (disabled) return true;
            }
            // if script gets this far it means that the day/month/year doesn't need to be disabled
            return false;
        };
        /**
         *  Sets the caption in the header of the date picker and enables or disables navigation buttons when necessary.
         *
         *  @param  string  caption     String that needs to be displayed in the header
         *
         *  @return void
         *
         *  @access private
         */
        //显示内容
        var manage_header = function(caption) {
            // update the caption in the header
            header.find('.dp_caption').html(caption);
            // if calendar is future-only or past-only
            if (direction !== 0) {
                // get the current year and month
                var year = selected_year,
                    month = selected_month,
                    value;
                // if current view is showing days
                if (view == 'days') {
                    // if calendar is future-only and decrementing the month gets us out of range
                    if (direction && --month < 0) {
                        // go to the previous year
                        month = 11;
                        year--;
                        // calendar is past-only and incrementing the month, gets us out of range
                    } else if (!direction && ++month > 11) {
                        // go to the next year
                        month = 0;
                        year++;
                    }
                    // the value that needs to be checked later by "is_disabled"
                    value = str_concat(year, str_pad(month, 2));
                    // if current view is showing months
                } else if (view == 'months') {
                    // if calendar is future-only, decrement the year
                    if (direction) year--;
                    // if calendar is past-only, increment the year
                    else year++;
                    // the value that needs to be checked later by "is_disabled"
                    value = year;
                    // if current view is showing years
                } else if (view == 'years') {
                    // if calendar is future-only, decrement year by 7
                    if (direction) year -= 7;
                    // if calendar is past-only, increment year by 7
                    else year += 7;
                    // the value that needs to be checked later by "is_disabled"
                    value = year;
                }
                // if the month/year is disabled
                if (is_disabled(value)) {
                    // disable it
                    header.find(direction ? '.dp_previous' : '.dp_next').addClass('dp_blocked');
                    header.find(direction ? '.dp_previous' : '.dp_next').removeClass('dp_hover');
                    // otherwise, "previous" or "next" buttons must be clickable
                } else header.find(direction ? '.dp_previous' : '.dp_next').removeClass('dp_blocked');
            }
        };
        var headers = function() {};
        /**
         *  Shows the appropriate view (days, months or years) according to the current value of the "view" property.
         *
         *  @return void
         *
         *  @access private
         */
        var manage_views = function() {
                // if the day picker was not yet generated
                if (daypicker.text() == '' || view == 'days') {
                    // if the day picker was not yet generated
                    if (daypicker.text() == '') {
                        // temporarily make the date picker visible
                        // so that we can later grab its width and height
                        datepicker.css({
                            'left': -1000,
                            'display': 'block'
                        });
                        // generate the day picker
                        generate_daypicker();
                        // get the day picker's width and height
                        var width = 120,
                            height = 45;
                        // adjust the size of the header 
                        header.css('width', width);
                        // make the month picker have the same size as the day picker
                        monthpicker.css({
                            'width': width,
                            'height': height
                        });
                        // make the year picker have the same size as the day picker
                        yearpicker.css({
                            'width': width,
                            'height': height
                        });
                        // hide the date picker again
                        datepicker.css({
                            'display': 'none'
                        });
                        // if the day picker was previously generated at least once
                        // generate the day picker
                    } else generate_daypicker();
                    // hide the year and the month pickers
                    monthpicker.css('display', 'none');
                    yearpicker.css('display', 'none');
                }
            }
            /**
             *  Left-pad a string to a certain length with zeroes.
             *
             *  @param  string  str     The string to be padded.
             *
             *  @param  integer len     The length to which the string must be padded
             *
             *  @return string          Returns the string left-padded with leading zeroes
             *
             *  @access private
             */
        var str_pad = function(str, len) {
                // make sure argument is a string
                str += '';
                // pad with leading zeroes until we get to the desired length
                while (str.length < len) str = '0' + str;
                // return padded string
                return str;
            }
            /**
             *  Concatenates any number of arguments and returns them as string.
             *
             *  @return string  Returns the concatenaded values.
             *
             *  @access private
             */
        var str_concat = function() {
                var str = '';
                // concatenate as string
                for (var i = 0; i < arguments.length; i++) str += (arguments[i] + '');
                // return the concatenated values
                return str;
            }
            /**
             *  Returns the integer representation of a string
             *
             *  @return int     Returns the integer representation of the string given as argument
             *
             *  @access private
             */
        var to_int = function(str) {
                // as the "direction" property can be true or false, make sure we interpret them as "0"
                return parseInt((str === true || str === false ? 0 : str), 10);
            }
            // initialize the plugin
        init();
    }
    $.fn.Zebra_DatePicker = function(options) {
        return this.each(function() {
            // if element has a date picker already attached
            // create a new instance of the plugin
            var plugin = new $.Zebra_DatePicker(this, options);
            // save a reference to the newly created object
            $(this).data('Zebra_DatePicker', plugin);
        });
    }
})(jQuery);