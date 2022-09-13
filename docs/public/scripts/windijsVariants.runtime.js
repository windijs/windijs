var windijsVariants=function(e,t,a,i){"use strict";const r=a.createVariant("&:first-child"),n=a.createVariant("&:last-child"),d=a.createVariant("&:nth-of-type(even)"),c=a.createVariant("&:nth-of-type(odd)"),o=a.createVariant("&:default"),l=a.createVariant("&:not(:first-child)"),s=a.createVariant("&:not(:last-child)"),p=a.createVariant("&:nth-child(odd)"),h=a.createVariant("&:nth-child(even)"),{visited:f,checked:m,disabled:x,focusWithin:V,hover:u,focus:y,focusVisible:w,active:v,link:M,target:g,notChecked:O,enabled:T,indeterminate:b,invalid:k,valid:$,optional:C,required:_,placeholderShown:j,readOnly:L,readWrite:W,notDisabled:F,firstOfType:S,notFirstOfType:D,lastOfType:q,notLastOfType:H,onlyChild:P,notOnlyChild:A,onlyOfType:R,notOnlyOfType:z,root:B,empty:E}=i.useProxy((e=>((e=t.camelToDash(e)).startsWith("not-")&&(e=`not(:${e.slice(4)})`),a.createVariant("&:"+e)))),G=a.createVariant("&::after"),I=a.createVariant("&::before"),J=a.createVariant("&::first-letter"),K=a.createVariant("&::first-line"),N=a.createVariant("& *::marker, &::marker"),Q=a.createVariant("& *::selection, &::selection"),U=a.createVariant(".group:hover &"),X=a.createVariant(".group:focus &"),Y=a.createVariant(".group:active &"),Z=a.createVariant(".group:visited &"),ee=a.createVariant("& svg"),te=a.createVariant("& *"),ae=a.createVariant("& > *"),ie=a.createVariant("& ~ *"),re=a.createVariant("& + *"),ne=a.createMedia("(min-width: 640px)"),de=a.createMedia("(min-width: 768px)"),ce=a.createMedia("(min-width: 1024px)"),oe=a.createMedia("(min-width: 1280x)"),le=a.createMedia("(min-width: 1536px)"),se=a.createMedia("(max-width: 640px)"),pe=a.createMedia("(max-width: 768px)"),he=a.createMedia("(max-width: 1024px)"),fe=a.createMedia("(max-width: 1280x)"),me=a.createMedia("(max-width: 1536px)"),xe=a.createMedia("(min-width: 640px) and (max-width: 768px)"),Ve=a.createMedia("(min-width: 768px) and (max-width: 1024px)"),ue=a.createMedia("(min-width: 1024px) and (max-width: 1280px)"),ye=a.createMedia("(min-width: 1280px) and (max-width: 1536px)"),we=a.createMedia("(min-width: 1536px)"),ve=a.createMedia("(prefers-reduced-motion: no-preference)"),Me=a.createMedia("(prefers-reduced-motion: reduce)"),ge=a.createMedia("(prefers-color-scheme: dark)"),Oe=a.createMedia("(prefers-color-scheme: light)"),Te=a.createVariant(".dark &"),be=a.createVariant(".light &"),ke=a.createMedia("(orientation: portrait)"),$e=a.createMedia("(orientation: landscape)"),Ce=a.createVariant("[dir='ltr'] &, [dir='ltr']&"),_e=a.createVariant("[dir='rtl'] &, [dir='rtl']&");return e.$dark=Te,e.$default=o,e.$lg=ue,e.$light=be,e.$md=Ve,e.$sm=xe,e.$xl=ye,e.$xxl=we,e._lg=he,e._md=pe,e._sm=se,e._xl=fe,e._xxl=me,e.active=v,e.after=G,e.all=te,e.before=I,e.checked=m,e.children=ae,e.dark=ge,e.disabled=x,e.empty=E,e.enabled=T,e.even=h,e.evenOfType=d,e.first=r,e.firstLetter=J,e.firstLine=K,e.firstOfType=S,e.focus=y,e.focusVisible=w,e.focusWithin=V,e.groupActive=Y,e.groupFocus=X,e.groupHover=U,e.groupVisited=Z,e.hover=u,e.indeterminate=b,e.invalid=k,e.landscape=$e,e.last=n,e.lastOfType=q,e.lg=ce,e.light=Oe,e.link=M,e.ltr=Ce,e.marker=N,e.md=de,e.motionReduce=Me,e.motionSafe=ve,e.notChecked=O,e.notDisabled=F,e.notFirst=l,e.notFirstOfType=D,e.notLast=s,e.notLastOfType=H,e.notOnlyChild=A,e.notOnlyOfType=z,e.odd=p,e.oddOfType=c,e.onlyChild=P,e.onlyOfType=R,e.optional=C,e.placeholderShown=j,e.portrait=ke,e.readOnly=L,e.readWrite=W,e.required=_,e.root=B,e.rtl=_e,e.selection=Q,e.sibling=re,e.siblings=ie,e.sm=ne,e.svg=ee,e.target=g,e.valid=$,e.visited=f,e.xl=oe,e.xxl=le,Object.defineProperty(e,"__esModule",{value:!0}),e}({},windijsShared,windijsCore,windijsHelpers);
