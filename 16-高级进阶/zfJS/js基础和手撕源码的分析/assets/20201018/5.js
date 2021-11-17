/* let p1 = new Promise(resolve => {
    resolve('OK');
}); */
// Promise.resolve:创建一个状态为成功的promise实例
// Promise.reject:创建一个状态为失败的promise实例

/*
 * 执行.then方法返回一个全新的promise实例
 *  「promise实例状态和值的分析」
 *   第一种情况：new Promise出来的实例
 *     + resolve/reject的执行控制其状态[[PromiseState]]以及[[PromiseResult]]
 *     + executor函数执行失败控制其[[PromiseState]]=rejected & [[PromiseResult]]=报错信息
 *   第二种情况：.then返回的新实例
 *     + then注入的两个方法，不论哪个方法执行，只要执行不报错，新实例的状态就是fulfilled；只要执行报错，新实例的状态就是rejected；并且新实例的[[PromiseResult]]是方法返回的值；
 *     + 但是如果方法执行返回的是一个新的promise实例，则此实例最后的成功或者失败，直接决定.then返回实例的成功和失败「得到的结果也都是一样的」；
 */
/* 
let p1 = new Promise((resolve, reject) => {
    resolve('OK');
});
let p2 = p1.then(result => {
    console.log('成功->', result); //->成功 'OK'
    return 10;
}, reason => {
    console.log('失败->', reason);
});

p2.then(result => {
    console.log('成功->', result); //->成功 10
}, reason => {
    console.log('失败->', reason);
}); 
*/

/* let p1 = new Promise((resolve, reject) => {
    reject('NO');
});
let p2 = p1.then(result => {
    console.log('成功->', result);
    return 10;
}, reason => {
    console.log('失败->', reason); //->失败 'NO'
    return 20;
});

p2.then(result => {
    console.log('成功->', result); //->成功 20
}, reason => {
    console.log('失败->', reason);
}); */

/* let p1 = Promise.resolve('OK');
let p2 = p1.then(result => {
    console.log('成功->', result); //->成功 'OK'
    return Promise.reject('NO'); //返回的promise实例的状态和结果就是最后p2的状态和结果
}, reason => {
    console.log('失败->', reason);
    return 20;
});

p2.then(result => {
    console.log('成功->', result);
}, reason => {
    console.log('失败->', reason); //->失败 'NO'
}); */


// 对于失败的promie实例，如果没有编写方法处理其结果，则会在控制台抛出异常信息「但是不会阻碍其余的代码执行」
// 在.then注入方法的时候，如果其中某个方法没有传递，则会顺延到下一个then中具备相同状态需要执行的函数上
/* 
Promise.reject('NO')
    .then(result => {
        console.log('成功->', result);
        return 10;
    } /!*,reason=>{ return Promie.reject(reason); }*!/ )
    .then(null, reason => {
        console.log('失败->', reason); //->失败 'NO'
    }); 
*/

/*
Promise.resolve('OK')
    .then(null /!* result=>{ return result; } *!/ , reason => {
        console.log('失败->', reason);
    })
    .then(result => {
        console.log('成功->', result); //->成功 'OK'
    });
*/

// 真实项目中，在多个THEN链下，其余的THEN方法基本都存放的是成功处理的事情，最后一个THEN存放失败的，这样不论是第一此或者其中某一次，导致promise实例状态是失败的，都会顺延到最后一个失败的处理函数上进行处理...
//   + then(null,reason=>{...}) 用 catch(reason=>{...}) 来代替
/* 
Promise.resolve('OK')
    .then(result => {
        console.log('成功->', result);
        return 10;
    })
    .then(result => {
        console.log('成功->', result);
        return Promise.reject('NO');
    })
    .catch(reason => {
        console.log('失败->', reason);
    }); 
*/

// 同时处理多个Promise实例
//  + Promise.all：等待所有的promise实例都成功，整体返回的状态才是成功，只要有一个失败，整体状态就是失败
//  + Promise.race：看多个实例谁先处理完，先处理完成的状态「不论是失败还是成功」就是最后整体的状态

const api1 = () => {
    return new Promise(resolve => {
        $.ajax({
            url: '/api/1.json',
            dataType: 'json',
            success(result) {
                resolve(result);
            }
        });
    });
};
const api2 = () => {
    return new Promise(resolve => {
        $.ajax({
            url: '/api/2.json',
            dataType: 'json',
            success(result) {
                resolve(result);
            }
        });
    });
};
const api3 = () => {
    return new Promise(resolve => {
        $.ajax({
            url: '/api/3.json',
            dataType: 'json',
            success(result) {
                resolve(result);
            }
        });
    });
};
const fn = () => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve('定时器');
        }, 1000);
    });
};
const AA = Promise.resolve('AA');

let p = Promise.all([api1(), api2(), api3(), AA, fn(), 10]);
p.then(results => {
    //都成功，p就是就是成功的：results是按照之前设定的顺序依次存储每一个promise的结果
    console.log('成功->', results);
}).catch(reason => {
    //只要处理过程中有一个失败的，则立即结束处理，p也是失败的：谁失败的，记录谁的失败原因
    console.log('失败->', reason);
});

// ajax并行：同时发送多个异步的ajax请求（三者之间没有依赖关系），但是需要所有的异步请求都处理成功后，再去统一做什么事情