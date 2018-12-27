import React, {Component, Fragment} from 'react';

import './App.css';

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            menuList: this.getEditedData(),
            searchResultList: [],
            notFoundMessage: '',

        };

    }

    //gelen datanın türünü algılamay yarayan metod
    getEditedData = () => {

        //propsla datayı yakaladık
        let propsData = this.props.data;

        //datanın içinde parentID yoksa tree yapıdadır. burada onun kontrolünü yaptık.
        // Tree yapıda değilse biz bu if yapısının içinde onu tree yapıya çeviriyoruz.
        let parentID = this.props.parentId;
        if (typeof this.props.data[0][this.props.parentId] !== "undefined") {

            //Parentleri yakaladık
            let filterParent = propsData.filter(f => typeof f[parentID] !== "number" || f[parentID] < 1);

            //İşlemler sonucunda geri döndürülecek datayı tanımladık
            let resultList = [];

            //for ile parentleri dolaşıp childleri tree yapıya sokuyoruz
            for (let item of filterParent) {

                //recursive metodumuzu çağırdık.
                let resultObj = this.editData(item, propsData);

                resultList.push(resultObj);

            }
            return resultList;


        } else {

            for (let obj of propsData) {

                //data tree yapıdaysa çalışacak recursive metodu çağırdık.
                this.editTreeData(obj);

            }

            return propsData;
        }
    };

    // tree yapıdaki dataya veri eklemesi yaptık.
    editTreeData = (obj) => {

        if (obj.children !== null) {

            obj.isActive = false;
            for (let item of obj.children) {
                this.editTreeData(item);
            }
        }
    };

    // bu metod recursive şekilde çalışıyor ve parentlerden aldığımız
    // verileri alıp tree yapıya çeviriyor.
    editData = (item, data) => {

        let parentID = this.props.parentId;

        let filter = data.filter(f => f[parentID] === item.id);

        if (filter.length !== 0) {

            item.children = filter;
            item.isActive = false;

            for (let i = 0; i < filter.length; i++) {

                item.children[i] = this.editData(filter[i], data);

            }


        } else {

            item.children = null;
            item.isActive = false;
        }

        return item;
    };


    //Render'landığında çalışan metod
    recRenderList = (menu) => {
        return menu.map((item, i) => {

            return <li key={i}>
                <span className={item.children !== null ? (item.isActive === true ? "caret caret-down" : "caret") : "not-caret"} onClick={(e) => this.openSubList(item, e)}/>
                <input type="checkbox" onChange={(e) => this.openSubList(item, e)} checked={item[this.props.isCheck]}/>
                <label onClick={(e) => this.openSubList(item, e)}>{item[this.props.title]}</label>
                {item.children !== null ?
                    <ul className={item.isActive === true ? "nested active" : "nested"}>
                        {this.recRenderList(item.children)}
                    </ul>
                    : null}
            </li>
        })

    };

    changeChildrenIsCheck = (childrenList, pIsCheck) => {

        for (let i = 0; i < childrenList.length; i++) {

            childrenList[i][this.props.isCheck] = pIsCheck;

            if (childrenList[i].children !== null) {

                this.changeChildrenIsCheck(childrenList[i].children, childrenList[i][this.props.isCheck]);
            }
        }


    };

    //Checklendiğinde listenin açılması
    openSubList = (item, el) => {

        if (el.target.tagName === 'INPUT') {
            let elementArray = el.target.parentElement.getElementsByTagName("span");
            let elementULArray = el.target.parentElement.getElementsByTagName("ul");
            for (let element of elementArray) {
                if (element.classList.contains('caret-down') === false) {
                    element.classList.add('caret-down');
                }

            }

            for (let element of elementULArray) {
                if (element.classList.contains('active') === false) {
                    element.classList.add('active');
                }

            }
            item[this.props.isCheck] = !item[this.props.isCheck];

            if (item.children !== null) {
                this.changeChildrenIsCheck(item.children, item[this.props.isCheck])
            }

            //setState gerek olmadan render çalıştırma
            this.forceUpdate();

        } else {

            el.target.parentElement.lastChild.classList.toggle("active");
            el.target.parentElement.firstChild.classList.toggle("caret-down");
        }

        this.updateLists(this.state.menuList, this.state.searchResultList)

    };

    updateLists = (mList, sList) => {

        for (let searchElement of sList) {

            for (let mElement of mList) {

                if (mElement[this.props.title] === searchElement[this.props.title]) {

                    if (searchElement.children !== null) {

                        this.updateLists(mElement.children, searchElement.children);
                    }

                    mElement[this.props.isCheck] = searchElement[this.props.isCheck];
                }

            }

        }
    };

    //Arama metodu
    handleChange = (e) => {

        let value = e.target.value.toUpperCase();

        if (value.length === 0) {
            this.setState({
                searchResultList: [],
                notFoundMessage: ''
            })
        } else {

            let temp = [];

            //Referas değerden kurtarmak için bu kodu yazdık.
            // Eğer bu kodu yazmazsak state içindeki menu listi değiştiriyor
            let listCopy = JSON.parse(JSON.stringify(this.state.menuList));

            for (let i = 0; i < listCopy.length; i++) {
                if (listCopy[i].children !== null) {

                    let result = this.recHandleChange(listCopy[i].children, value);

                    if (result.length > 0) {
                        let obj = listCopy[i];
                        obj.isActive = true;
                        obj.children = result;
                        temp.push(obj)
                    }
                    else if (listCopy[i][this.props.title].toUpperCase().includes(value)) {
                        temp.push(listCopy[i])
                    }

                } else {
                    if (listCopy[i][this.props.title].toUpperCase().includes(value)) {
                        temp.push(listCopy[i])
                    }
                }
            }

            if (temp.length > 0) {

                this.setState({
                    searchResultList: temp,
                    notFoundMessage: ''
                });

            } else {
                this.setState({
                    notFoundMessage: 'not found',
                    searchResultList: []
                });
            }

        }

    };


    //Arama metodu child Recursive
    recHandleChange = (children, value) => {
        let saveList = [];

        for (let i = 0; i < children.length; i++) {
            if (children[i].children !== null) {

                let childArray = this.recHandleChange(children[i].children, value);

                if (childArray.length > 0) {
                    let obj = children[i];
                    obj.children = '';
                    obj.isActive = true;
                    obj.children = childArray;

                    saveList.push(obj)

                }
                else if (children[i][this.props.title].toUpperCase().includes(value)) {
                    saveList.push(children[i])
                }

            } else {
                if (children[i][this.props.title].toUpperCase().includes(value)) {
                    saveList.push(children[i])

                }
            }
        }

        return saveList;

    };


    render() {

        return (
            <Fragment>
                <input type="text" id="searchInput" onChange={(e) => this.handleChange(e)} placeholder="Search..."/>
                {this.state.notFoundMessage}
                <ul>
                    {this.state.searchResultList.length > 0 ? this.recRenderList(this.state.searchResultList) :
                        this.recRenderList(this.state.menuList)}
                </ul>
            </Fragment>
        );
    }
}

export default App;