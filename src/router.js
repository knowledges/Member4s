/**
 * Created by qbl on 2016/8/24.
 */
import $ from 'jquery'
export  default function (router) {
    router.map({
        '/':{
            component (resolve) {
                require(['./views/Login/login'], resolve)
            }
        },
        '/login':{
            component (resolve) {
                require(['./views/Login/login'], resolve)
            }
        },
        '/u':{
            component (resolve) {
                require(['./home'], resolve)
            },
            subRoutes:{
                '/':{
                    component (resolve) {
                        require(['./views/store'], resolve)
                    }
                },
                '/store':{
                    component (resolve) {
                        require(['./views/store'], resolve)
                    }
                },
                '/order':{
                    component (resolve) {
                        require(['./views/order'], resolve)
                    },
                    subRoutes:{
                        '/':{
                            component (resolve) {
                                require(['./components/order/all'], resolve)
                            }
                        },
                        '/all':{
                            component (resolve) {
                                require(['./components/order/all'], resolve)
                            },
                        },
                        '/shipment':{
                            component (resolve) {
                                require(['./components/order/shipment'], resolve)
                            }
                        },
                        '/payment':{
                            component (resolve) {
                                require(['./components/order/payment'], resolve)
                            }
                        },
                        '/liftCar':{
                            component (resolve) {
                                require(['./components/order/liftCar'], resolve)
                            }
                        },
                        '/completed':{
                            component (resolve) {
                                require(['./components/order/completed'], resolve)
                            }
                        }
                    }
                },
                '/manage':{
                    component (resolve) {
                        require(['./views/manage'], resolve)
                    },
                    subRoutes:{
                        '/':{
                            component (resolve) {
                                require(['./components/manage/myOffer'], resolve)
                            }
                        },
                        '/myOffer':{
                            component (resolve) {
                                require(['./components/manage/myOffer'], resolve)
                            }
                        },
                        '/add':{
                            component (resolve) {
                                require(['./components/manage/add'], resolve)
                            }
                        },
                    }
                },
                '/active':{
                    component (resolve) {
                        require(['./views/active'], resolve)
                    },
                    subRoutes:{
                        '/':{
                            component (resolve) {
                                require(['./components/active/thisShop'], resolve)
                            }
                        },
                        '/thisShop':{
                            component (resolve) {
                                require(['./components/active/thisShop'], resolve)
                            }
                        },
                        '/add':{
                            component (resolve) {
                                require(['./components/active/add'], resolve)
                            }
                        },
                    }
                },
                '/active/thisShop/*any':{
                    component (resolve) {
                        require(['./components/active/history'], resolve)
                    },
                    subRoutes:{
                        '/':{
                            component (resolve) {
                                require(['./components/active/historyarray'], resolve)
                            }
                        },
                        '/info':{
                            component (resolve) {
                                require(['./components/active/historyarray'], resolve)
                            }
                        }
                    }
                },
                '/message':{
                    component (resolve) {
                        require(['./views/message'], resolve)
                    },
                    subRoutes:{
                        '/':{
                            component (resolve) {
                                require(['./components/messages/orders'], resolve)
                            }
                        },
                        '/orders':{
                            component (resolve) {
                                require(['./components/messages/orders'], resolve)
                            }
                        },
                        '/messages':{
                            component (resolve) {
                                require(['./components/messages/messages'], resolve)
                            }
                        },
                    }
                },
                '/exchange':{
                    component (resolve) {
                        require(['./views/exchange'], resolve)
                    },
                    subRoutes:{
                        '/':{
                            component (resolve) {
                                require(['./components/exchange/cashing'], resolve)
                            }
                        },
                        '/cashing':{
                            component (resolve) {
                                require(['./components/exchange/cashing'], resolve)
                            }
                        },
                        '/rule':{
                            component (resolve) {
                                require(['./components/exchange/rule'], resolve)
                            }
                        },
                        '/history':{
                            component (resolve) {
                                require(['./components/exchange/history'], resolve)
                            }
                        },
                    }
                },
                '/accout':{
                    component (resolve) {
                        require(['./views/accout'], resolve)
                    },
                    subRoutes:{
                        '/':{
                            component (resolve) {
                                require(['./components/accout/info'], resolve)
                            }
                        },
                        '/info':{
                            component (resolve) {
                                require(['./components/accout/info'], resolve)
                            }
                        },
                        '/address':{
                            component (resolve) {
                                require(['./components/accout/address'], resolve)
                            }
                        },
                        '/head':{
                            component (resolve) {
                                require(['./components/accout/head'], resolve)
                            }
                        },
                        '/modify':{
                            component (resolve) {
                                require(['./components/accout/modify'], resolve)
                            }
                        },
                    }
                }
            }
        },
    });
    router.beforeEach(({to, from, next}) => {
        let toPath = to.path
        let fromPath = from.path
        console.log('to: ' + toPath + ' from: ' + fromPath)
        if (toPath.replace(/[^/]/g, '').length > 1) {
            router.app.isIndex = false
        }
        else {
            let depath = toPath === '/' || toPath === '/invite' || toPath === '/rank'
            router.app.isIndex = depath ? 0 : 1
        }
        next()//调用过度动画
    });

    router.afterEach(function ({to}) {
        console.log(`成功浏览到: ${to.path}`);
        // return router;
    })
}