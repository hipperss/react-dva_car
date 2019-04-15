

export default {
    "namespace": "carpick",
    "state": {
        "filter": [],
        "results": [],
        "amount": 0,
        "page": 1,
        "pagesize": 10,
        "sortby": "id",
        "sortDirec": 1
    },
    "reducers": {
        addtag_sync(state, { tittle, value, tagname, words }) {
            //如果存在的话添加，否则就修改
            var isExit = false;
            state.filter.forEach((item) => {

                if (item.tagname == tagname) isExit = true;
            })
            if (!isExit) {
                //增加
                return {
                    ...state,
                    "filter": [
                        ...state.filter,
                        {
                            tittle,
                            value,
                            tagname,
                            words
                        }
                    ],
                    "page": 1

                }
            } else {
                //修改
                return {
                    ...state,
                    "filter": state.filter.map((item) => {
                        if (item.tagname != tagname) return item;
                        return {
                            tittle,
                            value,
                            tagname,
                            words
                        }
                    }),
                    "page": 1
                }
            }
        },
        deltag_sync(state, { tagname }) {
            //删除某项
            return {
                ...state,
                "filter": state.filter.filter((item) => {
                    return item.tagname != tagname;
                }),
                "page": 1
            }
        },
        changeResult_sync(state, { results, amount }) {
            return {
                ...state,
                results,
                amount
            }
        },
        //改变页码
        changepage_sync(state, { page, pagesize, sortby, sortDirec }) {
            return {
                ...state,
                page: page || state.page,
                pagesize: pagesize || state.pagesize,
                sortby: sortby || state.sortby,
                sortDirec: sortDirec || state.sortDirec
            }
        }
    },
    "effects": {
        *addtag({ tittle, value, tagname, words }, { put, select }) {
            //这里是异步环境，当点击的时候获取数据
            //①获取当前的全局的state的值
            const filter = yield select((state) => state.carpick.filter)
            const { page, pagesize, sortby, sortDirec } = yield select((state) => state.carpick)
            var queryobj = {
                page: 1,
                pagesize,
                sortby,
                "sortDirec": sortDirec == "ascend" ? 1 : -1
            }
            //遍历已经有的筛选器
            filter.forEach((item) => {
                //根据你的action的tagname，加查询对象的键
                addQueryobjKey(item.tagname, item.value, queryobj)
            });

            //加一次本次的
            addQueryobjKey(tagname, value, queryobj);

            var querystring = (function () {
                var arr = [];
                for (var k in queryobj) {
                    arr.push(k + "=" + queryobj[k]);
                }
                return arr.join("&");
            })();

            const { results, amount } = yield fetch("/api?" + querystring).then(data => data.json())
            yield put({ "type": "addtag_sync", tittle, value, tagname, words })
            yield put({ "type": "changeResult_sync", results, amount })
        },
        *fetchInit(action, { put, select }) {
            const { page, pagesize } = yield select(state => state.carpick)
            const { results, amount } = yield fetch(`/api?page=${page}&pagesize=${pagesize}`).then(data => data.json());
            yield put({ "type": "changeResult_sync", results, amount });
        },
        *deltag({ tagname }, { put, select }) {
            const filter = yield select((state) => state.carpick.filter)
            const { page, pagesize, sortby, sortDirec } = yield select((state) => state.carpick)
            var queryobj = {
                page,
                pagesize,
                sortby,
                "sortDirec": sortDirec == "ascend" ? 1 : -1
            }
            //遍历已经有的筛选器
            filter.forEach((item) => {
                //删除
                if (item.tagname != tagname) {
                    //根据你的action的tagname，加查询对象的键
                    addQueryobjKey(item.tagname, item.value, queryobj)
                }
            });

            var querystring = (function () {
                var arr = [];
                for (var k in queryobj) {
                    arr.push(k + "=" + queryobj[k]);
                }
                return arr.join("&");
            })();

            const { results, amount } = yield fetch("/api?" + querystring).then(data => data.json())
            yield put({ "type": "deltag_sync", tagname })
            yield put({ "type": "changeResult_sync", results, amount })
        },
        *changepage({ page, pagesize, field, order }, { put, select }) {
            //最终目的是：
            //1) 改变state中的page
            //2）拉取数据
            // 这里不能改变state！这里是异步的环境！
            const filter = yield select((state) => state.carpick.filter)

            // //查询对象
            var queryobj = {
                page,    //得到最新的换页
                pagesize,
                "sortby": field,
                "sortDirec": order == "ascend" ? 1 : -1
            }

            //遍历已经有的筛选器
            filter.forEach((item) => {
                //根据你的action的tagname，加查询对象的键
                addQueryobjKey(item.tagname, item.value, queryobj)
            });

            //将queryobj对象变为查询字符串
            var querystring = (function () {
                var arr = [];
                for (var k in queryobj) {
                    arr.push(k + "=" + queryobj[k]);
                }
                return arr.join("&");
            })();

            const { results, amount } = yield fetch("/api?" + querystring).then(data => data.json());

            //两个put
            yield put({ "type": "changepage_sync", page, pagesize, "sortby": field, "sortDirec": order });
            yield put({ "type": "changeResult_sync", results, amount });
        }
    }
}

function addQueryobjKey(tagname, value, queryobj) {
    if (tagname == "品牌") {
        queryobj["brand"] = value;
    }

    if (tagname == "车系") {
        queryobj["series_name"] = value;
    }

    if (tagname == "价格") {
        queryobj["price"] = JSON.stringify(value);
    }

    if (tagname == "里程") {
        queryobj["km"] = JSON.stringify(value);
    }

    if (tagname == "车型") {
        queryobj["type"] = value;
    }

    if (tagname == "座位数") {
        queryobj["seat"] = parseInt(value);
    }

    if (tagname == "颜色") {
        queryobj["colorChinese"] = value;
    }

    if (tagname == "排量") {
        queryobj["engine"] = JSON.stringify(value);
    }

    if (tagname == "排放标准") {
        queryobj["paifang"] = value;
    }
    if (tagname == "燃料类型") {
        queryobj["ranliao"] = value;
    }
    if (tagname == "变速箱") {
        queryobj["biansuxiang"] = value;
    }
}