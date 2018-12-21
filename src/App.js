import React, {Component, Fragment} from 'react';

import './App.css';

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            menuList: [
                {
                    id: 1,
                    isCheck: false,
                    parentId: null,
                    title: "Title 1",
                    children: [
                        {
                            id: 11,
                            isCheck: false,
                            parentId: 1,
                            title: "Sub Title1-1",
                            children: null
                        },
                        {
                            id: 12,
                            isCheck: false,
                            parentId: 1,
                            title: "Sub Title1-2",
                            children: [
                                {
                                    id: 121,
                                    isCheck: false,
                                    parentId: 12,
                                    title: "Sub Title1-2-1",
                                    children: null
                                },
                                {
                                    id: 122,
                                    isCheck: false,
                                    parentId: 12,
                                    title: "Sub Title1-2-2",
                                    children: null
                                }
                            ]
                        }
                    ]
                },
                {
                    id: 2,
                    isCheck: false,
                    parentId: null,
                    title: "Title 2",
                    children: [
                        {
                            id: 21,
                            isCheck: false,
                            parentId: 2,
                            title: "Sub Title2-1",
                            children: null
                        },
                        {
                            id: 22,
                            isCheck: false,
                            parentId: 2,
                            title: "Sub Title2-2",
                            children: null
                        }
                    ]
                },
                {
                    id: 3,
                    isCheck: false,
                    parentId: null,
                    title: "Title 3",
                    children: [
                        {
                            id: 31,
                            isCheck: false,
                            parentId: 3,
                            title: "Sub Title3-1",
                            children: [
                                {
                                    id: 311,
                                    isCheck: false,
                                    parentId: 3,
                                    title: "Sub Title3-1-1",
                                    children: null
                                },
                                {
                                    id: 321,
                                    isCheck: false,
                                    parentId: 3,
                                    title: "g",
                                    children: null
                                }
                            ]
                        },
                        {
                            id: 32,
                            isCheck: false,
                            parentId: 3,
                            title: "Sub Title3-2",
                            children: null
                        }
                    ]
                }
            ],
            searchResultList: []
        }
    }

    //Render'landığında çalışan metod
    recRenderList = (menu) => {

        // const {menuList} = this.state;

        return menu.map((item, i) => {

            return <li key={i}>
                <span className={item.children !== null ? "caret" : "not-caret"}
                      onClick={(e) => this.openSubList(item, e)}/>
                <input type="checkbox" onChange={(e) => this.openSubList(item, e)} checked={item.isCheck}/>
                <label onClick={(e) => this.openSubList(item, e)}>{item.title}</label>

                {item.children !== null ?
                    <ul className={item.isCheck === true ? "nested active" : "nested"}>
                        {this.recRenderList(item.children)}
                    </ul>
                    : null}
            </li>
        })

    };

    changeChildrenIsCheck = (childrenList) => {

        for (let i = 0; i < childrenList.length; i++) {

            childrenList[i].isCheck = !childrenList[i].isCheck;

            if (childrenList[i].children !== null) {

                this.changeChildrenIsCheck(childrenList[i].children);
            }
        }


    };

    //Checklendiğinde listenin açılması
    openSubList = (item, el) => {

        // console.log(el.target);

        if (el.target.tagName === 'INPUT') {
            item.isCheck = !item.isCheck;

            if (item.children !== null) {
                this.changeChildrenIsCheck(item.children)
            }

            //setState gerek olmadan render çalıştırma
            this.forceUpdate();

        }


        console.log('new mneulist', this.state.menuList);


        // let parent = e.target.parentElement;
        // let parameterElement = e.target;
        //
        // if (type === "input") {
        //     let elementsInput = parent.lastChild.getElementsByTagName("input");
        //
        //     if (parameterElement.checked) {
        //
        //         let elUL = parent.getElementsByTagName("ul");
        //
        //         for (let i = 0; i < elUL.length; i++) {
        //
        //             elUL[i].classList.add("active");
        //             elUL[i].parentElement.firstChild.classList.add("caret-down");
        //         }
        //
        //         for (let i = 0; i < elementsInput.length; i++) {
        //
        //             elementsInput[i].checked = true;
        //
        //         }
        //
        //     } else {
        //
        //         for (let i = 0; i < elementsInput.length; i++) {
        //
        //             elementsInput[i].checked = false;
        //         }
        //     }
        //
        // } else {
        //     parent.firstChild.classList.toggle("caret-down");
        //     parent.lastChild.classList.toggle("active");
        // }
    };

    //Arama metodu
    handleChange = (e) => {

        let value = e.target.value.toUpperCase();

        if (value.length === 0) {
            this.setState({
                searchResultList: []

                //todo: tüm inputlar checked false yapılacak
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
                        obj.children = '';
                        obj.children = result;
                        temp.push(obj)
                    }
                    else if (listCopy[i].title.toUpperCase().includes(value)) {
                        temp.push(listCopy[i])
                    }

                } else {
                    if (listCopy[i].title.toUpperCase().includes(value)) {
                        temp.push(listCopy[i])
                    }
                }
            }

            this.setState({
                searchResultList: temp
            });
        }


    };

    //Arama metodu Recursive
    recHandleChange = (children, value) => {
        let saveList = [];

        for (let i = 0; i < children.length; i++) {
            if (children[i].children !== null) {

                let childArray = this.recHandleChange(children[i].children, value);


                if (childArray.length > 0) {
                    let obj = children[i];
                    obj.children = '';
                    obj.children = childArray;

                    saveList.push(obj)


                }
                else if (children[i].title.toUpperCase().includes(value)) {
                    saveList.push(children[i])
                }

            } else {
                if (children[i].title.toUpperCase().includes(value)) {
                    saveList.push(children[i])
                }
            }
        }

        return saveList;

    };


    render() {

        return (
            <Fragment>
                <input type="text" onChange={(e) => this.handleChange(e)} placeholder="Search..."/>
                <ul>
                    {this.state.searchResultList.length > 0 ? this.recRenderList(this.state.searchResultList) :
                        this.recRenderList(this.state.menuList)}
                </ul>
            </Fragment>
        );
    }
}

export default App;