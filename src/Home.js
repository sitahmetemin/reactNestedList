import React, {Component} from 'react';

import App from "./App";


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {

            menuList: [
                {
                    id: 1,
                    parentId : -1,
                    isCheck: false,
                    title: "Title 1"
                },
                {
                    id: 121,
                    parentId : 12,
                    isCheck: false,
                    title: "Sub Title1-2-1"
                },
                {
                    id: 122,
                    parentId : 12,
                    isCheck: false,
                    title: "Sub Title1-2-2"
                },
                {
                    id: 12,
                    parentId : 1,
                    isCheck: false,
                    title: "Sub Title1-2"
                },
                {
                    id: 11,
                    parentId : 1,
                    isCheck: false,
                    title: "Sub Title1-1"
                },
                {
                    id: 2,
                    parentId : null,
                    isCheck: false,
                    title: "Title 2"
                },
                {
                    id: 21,
                    parentId : 2,
                    isCheck: false,
                    title: "Sub Title2-1"
                },
                {
                    id: 22,
                    parentId : 2,
                    isCheck: false,
                    title: "Sub Title2-2"
                },
                {
                    id: 311,
                    parentId : 31,
                    isCheck: false,
                    title: "Sub Title"
                },
                {
                    id: 321,
                    parentId : 31,
                    isCheck: false,
                    title: "g"
                },
                {
                    id: 3,
                    parentId : 0,
                    isCheck: false,
                    title: "Title 3"
                },
                {
                    id: 31,
                    parentId : 3,
                    isCheck: false,
                    title: "Sub Title3-1"
                },
                {
                    id: 32,
                    parentId : 3,
                    isCheck: false,
                    title: "Sub Title3-2"
                }
            ],



            // menuList: [
            //     {
            //         id: 1,
            //         isCheck: false,
            //         title: "Title 1",
            //         children: [
            //             {
            //                 id: 11,
            //                 isCheck: false,
            //                 title: "Sub Title1-1",
            //                 children: null
            //             },
            //             {
            //                 id: 12,
            //                 isCheck: false,
            //                 title: "Sub Title1-2",
            //                 children: [
            //                     {
            //                         id: 121,
            //                         isCheck: false,
            //                         title: "Sub Title1-2-1",
            //                         children: null
            //                     },
            //                     {
            //                         id: 122,
            //                         isCheck: false,
            //                         title: "Sub Title1-2-2",
            //                         children: null
            //                     }
            //                 ]
            //             }
            //         ]
            //     },
            //     {
            //         id: 2,
            //         isCheck: false,
            //         title: "Title 2",
            //         children: [
            //             {
            //                 id: 21,
            //                 isCheck: false,
            //                 title: "Sub Title2-1",
            //                 children: null
            //             },
            //             {
            //                 id: 22,
            //                 isCheck: false,
            //                 title: "Sub Title2-2",
            //                 children: null
            //             }
            //         ]
            //     },
            //     {
            //         id: 3,
            //         isCheck: false,
            //         title: "Title 3",
            //         children: [
            //             {
            //                 id: 31,
            //                 isCheck: false,
            //                 title: "Sub Title3-1",
            //                 children: [
            //                     {
            //                         id: 311,
            //                         isCheck: false,
            //                         title: "Sub Title",
            //                         children: null
            //                     },
            //                     {
            //                         id: 321,
            //                         isCheck: false,
            //                         title: "g",
            //                         children: null
            //                     }
            //                 ]
            //             },
            //             {
            //                 id: 32,
            //                 isCheck: false,
            //                 title: "Sub Title3-2",
            //                 children: null
            //             }
            //         ]
            //     }
            // ],

        }
    }


    render() {
        return (
            <div>
                <App data={this.state.menuList} title={"title"} isCheck={"isCheck"} id={"id"} parentId={"parentId"}/>
            </div>
        );
    }
}

export default Home;