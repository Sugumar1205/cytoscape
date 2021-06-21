function loadGraph(dataArray) {
  debugger;

  document.querySelectorAll('.param').forEach(function(a) {
    debugger;
    a.remove()
  })
  var h = function (tag, attrs, children) {
    var el = document.createElement(tag);

    Object.keys(attrs).forEach(function (key) {
      var val = attrs[key];

      el.setAttribute(key, val);
    });

    children.forEach(function (child) {
      el.appendChild(child);
    });

    return el;
  };

  var t = function (text) {
    var el = document.createTextNode(text);

    return el;
  };

  var $ = document.querySelector.bind(document);

  var cy = window.cy = cytoscape({
    container: document.getElementById('cy'),
    style: dataArray[0],
    elements: dataArray[1],
    layout: {}
  });

  // var contextMenus = require('cytoscape-context-menus');

  // contextMenus(cy);

  cy.nodes().forEach(function (n) {
    debugger;
    var d = n.degree(false);

    n.data("score", d * 20);



  })

//   cy.on('cxttap', "node", function(e) {

//     debugger;
//   // cy.nodes(e.target.data().id).lock();
//   cy.nodes(e.target.data().id).lock();
//   // cy.nodes(e.id).lock();
//  // cy.nodes('#statedata/andhrapradesh').lock();
 

//   // cy.elements('node#'+e.target.data().id).lock();

//    // cy.$('#'+ e.target.data().id).lock();
//    });

cy.on('cxttap', function(event) {
  debugger;
  if (allSelected('node')) {
    contextMenu.hideMenuItem('select-all-nodes');
    contextMenu.showMenuItem('unselect-all-nodes');
  }
  else {
    contextMenu.hideMenuItem('unselect-all-nodes');
    contextMenu.showMenuItem('select-all-nodes');
  }
  if (allSelected('edge')) {
    contextMenu.hideMenuItem('select-all-edges');
    contextMenu.showMenuItem('unselect-all-edges');
  }
  else {
    contextMenu.hideMenuItem('unselect-all-edges');
    contextMenu.showMenuItem('select-all-edges');
  }
});


var allSelected = function (type) {
  if (type == 'node') {
    return cy.nodes().length == cy.nodes(':selected').length;
  }
  else if (type == 'edge') {
    return cy.edges().length == cy.edges(':selected').length;
  }
  return false;
}

var selectAllOfTheSameType = function (type) {
  if (type == 'node') {
    cy.nodes().select();
  } else if (type == 'edge') {
    cy.edges().select();
  }
};
var unselectAllOfTheSameType = function (type) {
  if (type == 'node') {
    cy.nodes().unselect();
    ;
  } else if (type == 'edge') {
    cy.edges().unselect();
  }
};

var contextMenu = cy.contextMenus({
  menuItems: [
    {
      id: 'remove',
      content: 'Lock',
      tooltipText: 'Lock',
      selector: 'node, edge',
      onClickFunction: function (event) {
        debugger;
        var target = event.target || event.cyTarget;
        removed = target.lock();

        contextMenu.showMenuItem('undo-last-remove');
      },
      hasTrailingDivider: true
    },
    {
      id: 'undo-last-remove',
      content: 'Unlock',
      selector: 'node, edge',
      show: false,
      coreAsWell: true,
      onClickFunction: function (event) {
        if (removed) {
          removed.unlock();
        }
        contextMenu.hideMenuItem('undo-last-remove');
      },
      hasTrailingDivider: true
    },
    {
      id: 'color',
      content: 'change color',
      tooltipText: 'change color',
      selector: 'node',
      hasTrailingDivider: true,
      submenu: [
        {
          id: 'color-blue',
          content: 'blue',
          tooltipText: 'blue',
          onClickFunction: function (event) {
            let target = event.target || event.cyTarget;
            target.style('background-color', 'blue');
          },
          submenu: [
            {
              id: 'color-light-blue',
              content: 'light blue',
              tooltipText: 'light blue',
              onClickFunction: function (event) {
                let target = event.target || event.cyTarget;
                target.style('background-color', 'lightblue');
              },
            },
            {
              id: 'color-dark-blue',
              content: 'dark blue',
              tooltipText: 'dark blue',
              onClickFunction: function (event) {
                let target = event.target || event.cyTarget;
                target.style('background-color', 'darkblue');
              },
            },
          ],
        },
        {
          id: 'color-green',
          content: 'green',
          tooltipText: 'green',
          onClickFunction: function (event) {
            let target = event.target || event.cyTarget;
            target.style('background-color', 'green');
          },
        },
        {
          id: 'color-red',
          content: 'red',
          tooltipText: 'red',
          onClickFunction: function (event) {
            let target = event.target || event.cyTarget;
            target.style('background-color', 'red');
          },
        },
      ]
    },
    {
      id: 'add-node',
      content: 'add node',
      tooltipText: 'add node',
      image: {src: "assets/add.svg", width: 12, height: 12, x: 6, y: 4},
      coreAsWell: true,
      onClickFunction: function (event) {
        var data = {
          group: 'nodes'
        };

        var pos = event.position || event.cyPosition;

        cy.add({
          data: data,
          position: {
            x: pos.x,
            y: pos.y
          }
        });
      }
    },
    {
      id: 'select-all-nodes',
      content: 'select all nodes',
      selector: 'node',
      coreAsWell: true,
      show: true,
      onClickFunction: function (event) {
        selectAllOfTheSameType('node');

        contextMenu.hideMenuItem('select-all-nodes');
        contextMenu.showMenuItem('unselect-all-nodes');
      }
    },
    {
      id: 'unselect-all-nodes',
      content: 'unselect all nodes',
      selector: 'node',
      coreAsWell: true,
      show: false,
      onClickFunction: function (event) {
        unselectAllOfTheSameType('node');

        contextMenu.showMenuItem('select-all-nodes');
        contextMenu.hideMenuItem('unselect-all-nodes');
      }
    },
    {
      id: 'select-all-edges',
      content: 'select all edges',
      selector: 'edge',
      coreAsWell: true,
      show: true,
      onClickFunction: function (event) {
        selectAllOfTheSameType('edge');

        contextMenu.hideMenuItem('select-all-edges');
        contextMenu.showMenuItem('unselect-all-edges');
      }
    },
    {
      id: 'unselect-all-edges',
      content: 'unselect all edges',
      selector: 'edge',
      coreAsWell: true,
      show: false,
      onClickFunction: function (event) {
        unselectAllOfTheSameType('edge');

        contextMenu.showMenuItem('select-all-edges');
        contextMenu.hideMenuItem('unselect-all-edges');
      }
    }
  ]
});

// var contextMenu = cy.contextMenus({
//   menuItems: [
//     {
//       id: 'remove',
//       content: 'Lock',
//       tooltipText: 'Lock',
//     //  image: {src: "assets/remove.svg", width: 12, height: 12, x: 6, y: 4},
//       selector: 'node, edge',
//       onClickFunction: function (event) {
//         debugger;
//         var target = event.target || event.cyTarget;
//         removed = target.lock();

//         contextMenu.showMenuItem('undo-last-remove');
//         contextMenu.hideMenuItem('remove');
//         contextMenu.hideMenuItem('select-all-nodes');
//         contextMenu.hideMenuItem('unselect-all-nodes');
//       },
//       hasTrailingDivider: true
//     },
//     {
//       id: 'undo-last-remove',
//       content: 'unlock',
//       selector: 'node, edge',
//       show: false,
//       coreAsWell: true,
//       onClickFunction: function (event) {
//         if (removed) {
//           removed.unlock();
//         }
//         contextMenu.hideMenuItem('undo-last-remove');
//         contextMenu.showMenuItem('remove');
//         contextMenu.hideMenuItem('select-all-nodes');
//         contextMenu.hideMenuItem('unselect-all-nodes');
//       },
//       hasTrailingDivider: true
//     },
//     // {
//     //   id: 'color',
//     //   content: 'change color',
//     //   tooltipText: 'change color',
//     //   selector: 'node',
//     //   hasTrailingDivider: true,
//     //   submenu: [
//     //     {
//     //       id: 'color-blue',
//     //       content: 'blue',
//     //       tooltipText: 'blue',
//     //       onClickFunction: function (event) {
//     //         let target = event.target || event.cyTarget;
//     //         target.style('background-color', 'blue');
//     //       },
//     //       submenu: [
//     //         {
//     //           id: 'color-light-blue',
//     //           content: 'light blue',
//     //           tooltipText: 'light blue',
//     //           onClickFunction: function (event) {
//     //             let target = event.target || event.cyTarget;
//     //             target.style('background-color', 'lightblue');
//     //           },
//     //         },
//     //         {
//     //           id: 'color-dark-blue',
//     //           content: 'dark blue',
//     //           tooltipText: 'dark blue',
//     //           onClickFunction: function (event) {
//     //             let target = event.target || event.cyTarget;
//     //             target.style('background-color', 'darkblue');
//     //           },
//     //         },
//     //       ],
//     //     },
//     //     {
//     //       id: 'color-green',
//     //       content: 'green',
//     //       tooltipText: 'green',
//     //       onClickFunction: function (event) {
//     //         let target = event.target || event.cyTarget;
//     //         target.style('background-color', 'green');
//     //       },
//     //     },
//     //     {
//     //       id: 'color-red',
//     //       content: 'red',
//     //       tooltipText: 'red',
//     //       onClickFunction: function (event) {
//     //         let target = event.target || event.cyTarget;
//     //         target.style('background-color', 'red');
//     //       },
//     //     },
//     //   ]
//     // },
//     {
//       id: 'add-node',
//       content: 'add node',
//       tooltipText: 'add node',
//       image: {src: "assets/add.svg", width: 12, height: 12, x: 6, y: 4},
//       coreAsWell: true,
//       onClickFunction: function (event) {
//         var data = {
//           group: 'nodes'
//         };

//         var pos = event.position || event.cyPosition;

//         cy.add({
//           data: data,
//           position: {
//             x: pos.x,
//             y: pos.y
//           }
//         });
//       }
//     },
//     {
//       id: 'select-all-nodes',
//      // content: 'select all nodes',
//       selector: 'node',
//       coreAsWell: true,
//       show: true,
//       onClickFunction: function (event) {
//         selectAllOfTheSameType('node');

//         contextMenu.hideMenuItem('select-all-nodes');
//         contextMenu.showMenuItem('unselect-all-nodes');
//       }
//     },
//     {
//       id: 'unselect-all-nodes',
//       content: 'unselect all nodes',
//       selector: 'node',
//       coreAsWell: true,
//       show: false,
//       onClickFunction: function (event) {
//         unselectAllOfTheSameType('node');

//         contextMenu.showMenuItem('select-all-nodes');
//         contextMenu.hideMenuItem('unselect-all-nodes');
//       }
//     },
//     {
//       id: 'select-all-edges',
//       content: 'select all edges',
//       selector: 'edge',
//       coreAsWell: true,
//       show: true,
//       onClickFunction: function (event) {
//         selectAllOfTheSameType('edge');

//         contextMenu.hideMenuItem('select-all-edges');
//         contextMenu.showMenuItem('unselect-all-edges');
//       }
//     },
//     {
//       id: 'unselect-all-edges',
//       content: 'unselect all edges',
//       selector: 'edge',
//       coreAsWell: true,
//       show: false,
//       onClickFunction: function (event) {
//         unselectAllOfTheSameType('edge');

//         contextMenu.showMenuItem('select-all-edges');
//         contextMenu.hideMenuItem('unselect-all-edges');
//       }
//     }
//   ]
// });
  // cy.animate({
  //   pan: { x:500, y: 500 }
  // }, {
  //   duration: 1000
  // });

  var params = {
    name: 'cola',
    avoidOverlap: true,
    fit: true,
    boundingBox: undefined,
    nodeSpacing: 6,
    edgeLengthVal: 50,
    directed: true,
    animate: true,
    randomize: true,
    maxSimulationTime: 1500,




  };
  var layout = makeLayout();

  layout.run();

  var $btnParam = h('div', {
    'class': 'param'
  }, []);

  var $config = $('#config');

  $config.appendChild($btnParam);

  var sliders = [
    {
      label: 'Edge length',
      param: 'edgeLengthVal',
      min: 1,
      max: 200,
      step: 1
    },

    {
      label: 'Node spacing',
      param: 'nodeSpacing',
      min: 1,
      max: 50,
      step: 1
    },
    {
      label: 'Node Size',
      param: 'nodeSizing',
      min: 10,
      max: 200,
      step: 10
    },
  ];

  var buttons = [
    {
      label: h('span', { 'class': 'fa fa-random' }, []),
      layoutOpts: {
        randomize: true,
        flow: null
      }
    },

    {
      label: h('span', { 'class': 'fa fa-long-arrow-down' }, []),
      layoutOpts: {
        flow: { axis: 'y', minSeparation: 30 }
      }
    },

  ];

  sliders.forEach(makeSlider);

  buttons.forEach(makeButton);

  function makeLayout(opts) {
    //params.randomize = false;
    //params.edgeLength = 32; // function(e){ return params.edgeLengthVal / 0.02; };

    for (var i in opts) {
      params[i] = opts[i];
    }

    return cy.layout(params);
  }

  function makeSlider(opts) {
    var $input = h('input', {
      id: 'slider-' + opts.param,
      type: 'range',
      min: opts.min,
      max: opts.max,
      step: opts.step,
      value: params[opts.param],
      'class': 'slider'
    }, []);

    var $param = h('div', { 'class': 'param' }, []);

    var $label = h('label', { 'class': 'label label-default', for: 'slider-' + opts.param }, [t(opts.label)]);

    $param.appendChild($label);
    $param.appendChild($input);

    $config.appendChild($param);

    var update = _.throttle(function () {
      debugger;
      params[opts.param] = $input.value;
      if (opts.param === "nodeSizing") {
        debugger;
        // cy.nodes().forEach
        // (function( n ){
        //   debugger;
        //   //  n.data('height', 500); });
        //   n.data({height : 100}); });

        cy.nodes().forEach(function (n) {
          debugger;

          n.style('width', $input.value + 'px');
          n.style('height', $input.value + 'px');

          if (parseInt($input.value) > 60) {
            n.style('font-size', '10px')
          }
          else {
            n.style('font-size', '4px')
          }
          //n.style('font-size', '12px')
        })

        //   cy.add({
        //     group: 'nodes',
        //     style: {
        //         height: 100,
        //         width: 100,
        //     }
        // })


      }

      layout.stop();
      layout = makeLayout();
      layout.run();


    }, 1000 / 30);

    $input.addEventListener('input', update);
    debugger;
    $input.addEventListener('change', update);
  }

  function makeButton(opts) {
    var $button = h('button', { 'class': 'btn btn-default' }, [opts.label]);

    $btnParam.appendChild($button);

    $button.addEventListener('click', function () {
      layout.stop();

      if (opts.fn) { opts.fn(); }

      layout = makeLayout(opts.layoutOpts);
      layout.run();
    });
  }

  var makeTippy = function (node, html) {
    debugger;
    return tippy(node.popperRef(), {
      html: html,
      trigger: 'manual',
      arrow: true,
      // content:'TEst',
      theme: 'light',
      placement: 'top',
      hideOnClick: false,
      interactive: true
    }).tooltips[0];
  };

  var hideTippy = function (node) {
    var tippy = node.data('tippy');

    if (tippy != null) {
      tippy.hide();
    }
  };

  var hideAllTippies = function () {
    cy.nodes().forEach(hideTippy);
  };

  cy.on('tap', function (e) {
    if (e.target === cy) {
      hideAllTippies();
    }
  });

  cy.on('tap', 'edge', function (e) {
    hideAllTippies();
  });

  cy.on('zoom pan', function (e) {
    hideAllTippies();
  });

  cy.nodes().forEach(function (n) {
    debugger;
    // var g = 'Name: ' + n.data('name') == 'undefined' ? n.data;
    var patientnumber = n.data('patientnumber') == undefined ? '' : 'Patient Number: ' + n.data('patientnumber');
    var bloodGroup = n.data('bloodgroup') == undefined ? 'State: ' + n.data('state_name') : 'Blood Group: ' + n.data('bloodgroup')
    var age = n.data('age') == undefined ? 'Districts: ' + n.data('districts') : 'Age: ' + n.data('age');
    var gender = n.data('gender') == undefined ? '' : 'Gender: ' + n.data('gender');

    var severity = n.data('severity') == undefined ? '' : 'Severity: ' + n.data('severity');
    var symptoms = n.data('symptoms') == undefined ? '' : 'Symptoms: ' + n.data('symptoms');
    var currentstatus = n.data('currentstatus') == undefined ? '' : 'Status: ' + n.data('currentstatus');
    var detecteddistrict = n.data('detecteddistrict') == undefined ? '' : 'Detected District: ' + n.data('detecteddistrict');
    var dateannounced = n.data('dateannounced') == undefined ? '' : 'Date Announced: ' + n.data('dateannounced');

    // "severity": "quarantine",
    // "symptoms": "asymptomatic",
    // "bloodgroup": "O+",
    // "age": "60",
    // "gender": "M",
    // "contractedfromwhichpatientsuspected": "",
    // "currentstatus": "Hospitalized",
    // "dateannounced": "28/03/2020",
    // "detecteddistrict": "Prakasam",
    // "detectedstate": "Andhra Pradesh",
    // "patientnumber": "1007",
    // "statepatientnumber": "AP-P16",
    // "statuschangedate": "28/03/2020",
    // "typeoftransmission": "Local"


    var d = n.degree(false);

    var $links = [h('p', {}, [t(patientnumber)]), h('p', {}, [t(bloodGroup)]), h('p', {}, [t(age)]), h('p', {}, [t(gender)]),
    h('p', {}, [t(severity)]), h('p', {}, [t(symptoms)]), h('p', {}, [t(currentstatus)]), h('p', {}, [t(detecteddistrict)]), h('p', {}, [t(dateannounced)])];

    var tippy = makeTippy(n, h('div', { 'class': 'tip-link' }, $links));

    n.data('tippy', tippy);

    n.on('click', function (e) {
      debugger;
      //var pos = cy.nodes(e.target.data().id).position();
      // cy.nodes(e.target.data().id).style('width', '100px');
      // cy.nodes(e.target.data().id).style('height', '100px');
      //   n.style('width', '100px');
      // n.style('height', '100px');
      // n.style('width', '100px');
      // cy.zoom({                       // Zoom to the specified position
      //   level: 3,             // 0 <= yourLevel, maybe try out 1,2,3,4... and see what fits
      //   position: pos
      // });
      var pos = cy.nodes(e.target.data().id).position();

      // var el = e.target.data().id;
      // var j = cy.$('#' + el);
      // cy.center(j);


      // cy.zoom({                       // Zoom to the specified position
      //   level: 3,             // 0 <= yourLevel, maybe try out 1,2,3,4... and see what fits
      //   position: pos
      // });
      // var j = cy.$(e.target.data().id);
      // cy.center(j);

      
      // cy.on('cxttap', "node", function(event) { });

       var ele = e.target;
      // ele.connectedEdges().style({ 'line-color': 'green' });
       ele.connectedEdges().animate({
             style: { 'line-color': 'red' }
           }, {
             duration: 5000
          })
       .delay(1000)
       .animate({style: { 'line-color': '#ebe4e4' }});

      tippy.show();
      debugger;
     // cy.nodes(e.target.data().id).lock();
      
    //   cy.nodes()
    //   .animate({
    //       style: { 'background-color': 'blue' }
    //     }, {
    //       duration: 1000
    //     })
    
    //   .delay( 1000 )
    
    //   .animate({
    //     style: { 'background-color': 'yellow' }
    //   })
    // ;


    // ele.connectedEdges().animate({
    //   style: { 'background-color': 'blue' }
    // }, {
    //   duration: 1000
    // })
    // .delay( 1000 )
    
    //   .animate({
    //     style: { 'background-color': 'yellow' }
    //   })
    // ;

    ele.connectedEdges().animate({
      style: { 'background-color': 'blue' }
    }, {
      duration: 1000
    })
    .delay( 1000 )
    
      .animate({
        style: { 'background-color': 'yellow' }
      })
    ;


      //cy.elements/nodes/edges('[selector =/!= "property"]');
      //cy.nodes('[selector =/!= "coo"]').connectedEdges().style({'line-color': 'blue'})
      //   cy.nodes(e.target.data().id).connectedEdges();
      cy.nodes().not(n).forEach();
    });
  });

  // cy.on("tap", "node", (evt) => {
  //   debugger;
  //   evt.cyTarget.connectedEdges().animate({
  //     style: { lineColor: "red" }
  //   })
  // })

  // $('#config-toggle').addEventListener('click', function () {
  //   $('body').classList.toggle('config-closed');

  //   cy.resize();
  // });
  var jpg64 = cy.jpg();

  // put the png data in an img tag
  document.querySelector('#jpg-eg').setAttribute('src', jpg64);

  

   
  // console.log( 'Sugu --------- ' + cy.json() );

};


