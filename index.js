(window.onhashchange = function () {
    switch (location.hash) {
        case '':
            $('body').html('');
            location.hash = '#/briefintroduction';
            break;
        case '#/briefintroduction':
            $('body').html('');
            briefintroduction();
            break;
        case '#/updatelog':
            $('body').html('');
            updatelog();
            break;
        case '#/download':
            $('body').html('');
            download();
            break;
        default:
            if (location.hash.search('#/updatelogSub/') != -1) {
                $('body').html('');
                updatelogSub();
            } else {
                $('body').html('');
                location.hash = '#/briefintroduction';
            }
            break;
    }
})();

function menu() {
    return $('<div></div>')
        .attr('class', 'ui large secondary pointing menu')
        .css({ 'margin-top': '2%', 'margin-left': '12%', 'margin-right': '12%' })
        .append($('<a></a>')
            .attr('class', 'item')
            .attr('id', 'menu1')
            .click(function () {
                location.hash = '#/briefintroduction';
            })
            .text('简介')
        )
        .append($('<a></a>')
            .attr('class', 'item')
            .attr('id', 'menu2')
            .click(function () {
                location.hash = '#/updatelog';
            })
            .text('更新日志')
        )
        .append($('<a></a>')
            .attr('class', 'item')
            .attr('id', 'menu3')
            .click(function () {
                location.hash = '#/download';
            })
            .text('下载')
        )
}

function briefintroduction() {
    document.title = '简介 - PBS系统';
    $('body')
        .append(menu())
        .append($('<div></div>')
            .attr('class', 'ui large segment')
            .css({ 'margin-top': '3%', 'margin-left': '15%', 'margin-right': '15%' })
            .append($('<div></div>')
                .attr('class', 'ui two column very relaxed grid')
                .append($('<div></div>')
                    .append($('<p></p>')
                        .append($('<img></img>')
                            .attr('class', 'ui big bordered image')
                            .css('margin', '5px')
                            .css('margin-left', '10px')
                            .attr('src', 'https://www.helloimg.com/images/2022/12/29/oCJtMt.jpg')
                        )
                    )
                )
                .append($('<div></div>')
                    .attr('class', 'column')
                    .attr('id', 'my')
                    .append($('<p></p>')
                        .text('Loading...')
                    )
                )
                .ready(function () {
                    $('#my').empty()
                        .append($('<p></p>')
                            .append($('<span></span>')
                                .attr('class', 'ui large text')
                                .text('PBS系统')
                            )
                        )
                        .append($('<p></p>')
                            .text('PBS系统是由思远游戏工作室编写的一个系统，长期更新！！')
                        )
                        .removeAttr('id');
                })
            )
        );
    $('#menu1').attr('class', 'active item');
}

function updatelog() {
    document.title = '更新日志 - PBS系统';
    let blogs = [], search = '';
    function refresh() {
        let list = $('#list').empty();
        for (let i in blogs) {
            let content = blogs[i].title + '\n\n' + marked.parse(blogs[i].body);
            if (content.search(search) != -1) {
                list.append($('<div></div>')
                    .attr('class', 'item')
                    .append($('<div></div>')
                        .attr('class', 'content')
                        .append($('<p></p>')
                            .append($('<a></a>')
                                .attr('class', 'ui medium header')
                                .attr('click_id', blogs[i].number)
                                .css('float', 'left')
                                .text(blogs[i].title)
                                .click(function () {
                                    window.open(`/#/updatelogSub/${$(this).attr('click_id')}`)
                                })
                            )
                            .append($('<span></span>')
                                .attr('class', 'ui small text')
                                .css('margin-left', '20px')
                                .text(`#${blogs[i].number}`)
                            )
                            .append($('<em></em>')
                                .css('float', 'right')
                                .text('By 思远游戏工作室')
                            )
                        )
                        .append($('<div></div>')
                            .attr('class', 'description')
                            .text(`Updated at ${new Date(blogs[i].updated_at).toLocaleString()}`)
                        )
                    )
                );
            }
        }
    }
    $('body')
        .append(menu())
        .append($('<div></div>')
            .attr('class', 'ui segment')
            .css({ 'margin-top': '5%', 'margin-left': '15%', 'margin-right': '15%' })
            .append($('<div></div>')
                .attr('class', 'ui large relaxed divided list')
                .attr('id', 'list')
                .ready(function () {
                    $.get('https://api.github.com/repos/Philip-Burkart-Game-Studio/PBS/issues?creator=BaoSiYuanCODE&state=open&per_page=10000&page=1', function (json, status) {
                        blogs = json;
                        blogs.sort(function (x, y) {
                            return Date.parse(y.updated_at) - Date.parse(x.updated_at);
                        });
                        refresh();
                    });
                })
            )
        );
    $('.right.menu')
        .prepend($('<div></div>')
            .attr('class', 'item')
            .append($('<div></div>')
                .attr('class', 'ui transparent icon input')
                .append($('<input></input>')
                    .attr('class', 'prompt')
                    .attr('type', 'text')
                    .attr('placeholder', '搜索...')
                    .bind('input', function () {
                        search = $(this).val();
                        refresh();
                    })
                )
            )
        );
    $('#menu2').attr('class', 'active item');
}

function updatelogSub() {
    document.title = '更新日志 - PBS系统';
    let id = location.hash.split('#/updatelogSub/')[1];
    $('body')
        .append(menu())
        .append($('<div></div>')
            .attr('class', 'ui segment')
            .css({ 'margin-top': '5%', 'margin-left': '15%', 'margin-right': '15%' })
            .append($('<h></h>')
                .attr('class', 'ui big header')
                .attr('id', 'title')
                .css('float', 'left')
            )
            .append($('<em></em>')
                .attr('class', 'ui text')
                .attr('id', 'id')
                .css('margin-left', '20px')
            )
            .append($('<div></div>')
                .attr('class', 'ui segment')
                .attr('id', 'content')
            )
            .ready(function () {
                $.get(`https://api.github.com/repos/Philip-Burkart-Game-Studio/PBS/issues/${id}`, function (json, status) {
                    marked.setOptions({
                        highlight: function (code) {
                            return hljs.highlightAuto(code).value;
                        }
                    });
                    $('#title').text(json.title).removeAttr('id');
                    $('#id').text(`#${json.number}`).removeAttr('id');
                    $('#content').html(marked.parse(json.body)).removeAttr('id');
                    $('img').css({ 'border': 'none', 'max-width': '70%' })
                });
            })
        );
    $('#menu2').attr('class', 'active item');
}

function download() {
    document.title = '下载 - PBS系统';
    $('body')
        .append(menu())
        .append($('<div></div>')
            .attr('class', 'ui large segment')
            .css({ 'margin-top': '3%', 'margin-left': '15%', 'margin-right': '15%' })
            .append($('<div></div>')
                .attr('class', 'ui two column very relaxed grid')
                .append($('<div></div>')
                    .append($('<p></p>')
                        .append($('<img></img>')
                            .attr('class', 'ui small bordered image')
                            .css('margin', '5px')
                            .css('margin-left', '10px')
                            .attr('src', 'https://www.helloimg.com/images/2022/12/29/oCJtMt.jpg')
                        )
                    )
                )
                .append($('<div></div>')
                    .attr('class', 'column')
                    .attr('id', 'my')
                    .append($('<p></p>')
                        .text('Loading...')
                    )
                )
                .ready(function () {
                    $('#my').empty()
                        .append($('<p></p>')
                            .append($('<span></span>')
                                .attr('class', 'ui large text')
                                .text('PBS 1.0(2022-12-28)系统')
                            )
                        )
                        .append($('<a></a>')
                            .attr('src2', 'https://www.luogu.com.cn/training/265688')
                            .text('PBS 1.0(2022-12-28)系统下载链接')
                        )
                        .removeAttr('id');
                })
            )
        );
    $('#menu3').attr('class', 'active item');
}