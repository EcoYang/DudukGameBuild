window.__require=function e(t,n,i){function a(s,r){if(!n[s]){if(!t[s]){var c=s.split("/");if(c=c[c.length-1],!t[c]){var l="function"==typeof __require&&__require;if(!r&&l)return l(c,!0);if(o)return o(c,!0);throw new Error("Cannot find module '"+s+"'")}s=c}var h=n[s]={exports:{}};t[s][0].call(h.exports,function(e){return a(t[s][1][e]||e)},h,h.exports,e,t,n,i)}return n[s].exports}for(var o="function"==typeof __require&&__require,s=0;s<i.length;s++)a(i[s]);return a}({Buff:[function(e,t,n){"use strict";cc._RF.push(t,"41ffcu56J1J+akFsUM96lOW","Buff");var i=cc.Enum({MaxMovementSpeed:0,JumpSpeed:1});cc.Class({extends:cc.Component,properties:{lifeSpan:{default:5},buffType:{default:i.MaxMovementSpeed,type:i},movementSpeed:{default:300,visible:function(){return this.buffType==i.MaxMovementSpeed}}},FindDeep:function(e,t){if(e.name==t)return e;for(var n=0;n<e.children.length;n++){var i=this.FindDeep(e.children[n],t);if(i)return i}},onLoad:function(){},start:function(){},Activate:function(){var e=this;this.Player=this.FindDeep(cc.director.getScene(),"Hero"),this.Hero=this.Player.getComponent("HeroController"),this.Hero.RegisterBuff(this),this.ApplyBuff();var t=this;setTimeout(function(){e.OnTimesUp(),t.node.destroy()},1e3*this.lifeSpan)},ApplyBuff:function(){if(this.Hero)switch(this.buffType){case i.MaxMovementSpeed:this.Hero.maxSpeed+=this.movementSpeed,this.Hero.acceleration+=this.movementSpeed;break;case i.JumpSpeed:}},RemoveBuff:function(){if(this.Hero)switch(this.buffType){case i.MaxMovementSpeed:this.Hero.maxSpeed-=this.movementSpeed,this.Hero.acceleration-=this.movementSpeed;break;case i.JumpSpeed:}},OnTimesUp:function(){this.Hero&&(this.RemoveBuff(),this.Hero.DeregisterBuff(this))},onDestroy:function(){}}),cc._RF.pop()},{}],CameraControl:[function(e,t,n){"use strict";cc._RF.push(t,"a9ec0CgrHJCPLf8WtuLAgTz","CameraControl"),cc.Class({extends:cc.Component,properties:{target:{default:null,type:cc.Node},bUseMargin:{default:!0},marginLeft:{default:100,visible:function(){return this.bUseMargin}},marginRight:{default:100,visible:function(){return this.bUseMargin}},marginTop:{default:10,visible:function(){return this.bUseMargin}},marginBottom:{default:10,visible:function(){return this.bUseMargin}}},onLoad:function(){this.target||(this.target=this.FindDeep(cc.director.getScene(),"Hero")),this.bFindOnce=!1},TryToGetTarget:function(){this.target=this.FindDeep(cc.director.getScene(),"Hero"),this.bFindOnce=!1},FindDeep:function(e,t){if(e.name==t)return e;for(var n=0;n<e.children.length;n++){var i=this.FindDeep(e.children[n],t);if(i)return i}},lateUpdate:function(e){var t=this;if(null!=this.target&&void 0!=this.target&&this.target.active){var n=this.node.position;if(this.bUseMargin){var i=this.node.position.x-this.target.position.x,a=this.node.position.y-this.target.position.y;i>this.marginLeft?n.x=this.target.position.x+this.marginLeft:-1*i>this.marginRight&&(n.x=this.target.position.x-this.marginRight),-1*a>this.marginTop?n.y=this.target.position.y-this.marginTop:a>this.marginBottom&&(n.y=this.target.position.y+this.marginBottom)}this.node.position=n}else this.bFindOnce||(setTimeout(function(){t.TryToGetTarget()},100),this.bFindOnce=!0)}}),cc._RF.pop()},{}],CoinMinusLabel:[function(e,t,n){"use strict";cc._RF.push(t,"60e91GwvKhBvr5ah8CLYRTl","CoinMinusLabel"),cc.Class({extends:cc.Component,properties:{},start:function(){var e=this;setTimeout(function(){e.node.destroy()},3e3)},update:function(e){this.node.position=cc.v2(this.node.position.x,this.node.position.y+250*e)}}),cc._RF.pop()},{}],Collectibles:[function(e,t,n){"use strict";cc._RF.push(t,"7de9bJiMuNMMLjrxQh//n9Q","Collectibles");var i=cc.Enum({Coins:0,SportsDrinks:1}),a=0;cc.Class({extends:cc.Component,properties:{CollectibleType:{default:i.Coins,type:i},buffPrefab:{default:null,type:cc.Prefab},movementSpeed:{default:150,visible:function(){return this.CollectibleType==i.SportsDrinks}}},FindDeep:function(e,t){if(e.name==t)return e;for(var n=0;n<e.children.length;n++){var i=this.FindDeep(e.children[n],t);if(i)return i}},onLoad:function(){this.m_Index=a++;var e=this;this.buffPrefab||cc.loader.loadRes("Buff/Buff",function(t,n){e.buffPrefab=n})},start:function(){this.m_GameMode=this.FindDeep(cc.director.getScene(),"Canvas").getComponent("GameMode"),this.m_GameMode.RegisterCollectible(this.node)},GetIndex:function(){return this.m_Index},onCollisionEnter:function(e,t){var n=e.getComponent("HeroController");if(null!=n&&void 0!=n){if(this.CollectibleType==i.Coins)n.CollectedCoins();else if(this.CollectibleType==i.SportsDrinks){var a=cc.instantiate(this.buffPrefab).getComponent("Buff");a.parent=cc.director.getScene(),a.buffType=0,a.movementSpeed=this.movementSpeed,a.Activate()}this.m_GameMode.CollectibleTaken(this),this.node.destroy()}}}),cc._RF.pop()},{}],GameMode:[function(e,t,n){"use strict";cc._RF.push(t,"11267q+MwpKa6fX8/J8fU6Q","GameMode");var i=cc.Enum({WaitingToStart:0,InMatch:1,PendingFinish:2,GameEnded:3,Paused:4});cc.Class(function(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}({extends:cc.Component,properties:{GameState:{default:i.WaitingToStart,type:i},HeroPrefab:{default:null,type:cc.Prefab},CoinPrefab:{default:null,type:cc.Prefab},SportDrinksPrefab:{default:null,type:cc.Prefab},backgroundMusicClip:{default:null,type:cc.AudioClip},victoryPrefab:{default:null,type:cc.Prefab},NextLevel:"",CurrentLevel:0},onLoad:function(){this.bDebugMode=!0,this.m_AllCollectibles=new Array,this.m_Player={},this.bWantsToStartMatch=!1,this.bWantToRestartMatch=!1,this.bWantToFinishGame=!1,this.bGameWon=!1,this.m_GameTime=0;var e=this;this.bMusicPlayed=!1,this.BaseUrl="http://gameapi.duduk.my/api/",this.bGameReadyToStart=!1,this.bHandledPlayerDeath=!1,this.bTryingToMoveToNextLevel=!1,this.HeroPrefab||cc.loader.loadRes("Prefabs/Hero",function(t,n){e.HeroPrefab=n}),this.CoinPrefab||cc.loader.loadRes("Prefabs/Coins",function(t,n){e.CoinPrefab=n}),this.SportDrinksPrefab,this.backgroundMusicClip||cc.loader.loadRes("BGM/Bg",function(t,n){e.backgroundMusicClip=n}),this.victoryPrefab||cc.loader.loadRes("Prefabs/VictoryPrefab",function(t,n){e.victoryPrefab=n})},OnFinishLoading:function(){this.bGameReadyToStart=!0,cc.log("Finish Loading Datas from Internet")},start:function(){var e=this.node.getChildByName("Root").getChildByName("Hero");this.RegisterPlayer(e),this.GetPlayerUserId()},update:function(e){this.GameState==i.InMatch&&(this.m_GameTime+=e)},GetPlayerUserId:function(){var t=this,n="".concat(this.BaseUrl,"User/GetUserId"),i=new XMLHttpRequest;i.onreadystatechange=function(){if(4==i.readyState&&i.status>=200&&i.status<400){var n=i.responseText;cc.log("Reponse : ".concat(n));var a=JSON.parse(n),o=e("PlayerState");if(o.PlayerId=a.userId,null==o.PlayerId||-1==o.PlayerId)return void console.error(" ERROR :: CANT GET PLAYER USER ID ");t.UpdatePlayerLoginTime(),t.GetPlayerStateData()}},i.open("GET",n,!0),i.send()},GetPlayerStateData:function(){var t=this,n=e("PlayerState"),i="".concat(this.BaseUrl,"Player/GetPlayerStateInfo/").concat(n.PlayerId),a=new XMLHttpRequest;a.onreadystatechange=function(){if(4==a.readyState&&a.status>=200&&a.status<400){var n=a.responseText,i=JSON.parse(n);if(console.log("Finish Getting Player Data ".concat(n)),console.log("Finish Getting Player Data Json ".concat(i)),null==i||0==i.length||"[]"==i)t.InsertNewPlayerData();else{var o=e("PlayerState");if(o.CurrentLevel="Level".concat(i[0].currentLevel),o.PlayerName=i[0].playerName,o.Coins=i[0].amountCoins,o.PlayerLastLogin=i[0].playerLastLogin,o.PlayerFirstLogin=i[0].playerFirstLogin,o.AmountOfDeaths=i[0].amountOfDeaths,cc.log("JSONResponse[0].currentLevel : ".concat(i[0].currentLevel)),cc.log("Current Level : ".concat(t.CurrentLevel)),i[0].currentLevel==t.CurrentLevel)return void t.OnFinishLoading();t.MoveToLevel(o.CurrentLevel)}}},a.open("GET",i,!0),a.send()},UpdateAmountOfDeaths:function(){var t=this,n=e("PlayerState"),i=n.AmountOfDeaths,a=++i,o="".concat(this.BaseUrl,"Player/UpdateAmountOfDeath"),s=new XMLHttpRequest,r="UserId=".concat(n.PlayerId,"&AmountOfDeaths=").concat(a);s.onreadystatechange=function(){if(4==s.readyState&&s.status>=200&&s.status<400){var e=s.responseText;cc.log("Updated Player Amount Of Death : ".concat(e)),t.bHandledPlayerDeath=!0}},s.open("POST",o,!0),s.setRequestHeader("Content-type","application/x-www-form-urlencoded"),s.send(r)},UpdatePlayerLoginTime:function(){var t=e("PlayerState"),n="".concat(this.BaseUrl,"Player/UpdateLastLogin"),i=new XMLHttpRequest,a="UserId=".concat(t.PlayerId);i.onreadystatechange=function(){if(4==i.readyState&&i.status>=200&&i.status<400){var e=i.responseText;cc.log("Updated Player Last Login : ".concat(e))}},i.open("POST",n,!0),i.setRequestHeader("Content-type","application/x-www-form-urlencoded"),i.send(a)},InsertNewPlayerData:function(){var t=this,n=e("PlayerState"),i="".concat(this.BaseUrl,"Player/InsertNewPlayer"),a=new XMLHttpRequest,o="UserId=".concat(n.PlayerId);a.onreadystatechange=function(){if(4==a.readyState&&a.status>=200&&a.status<400){var e=a.responseText;cc.log("Inserted New Player : ".concat(e)),t.OnFinishLoading()}},a.open("POST",i,!0),a.setRequestHeader("Content-type","application/x-www-form-urlencoded"),a.send(o)},TryToMoveToNextLevel:function(){if(!this.bTryingToMoveToNextLevel){var t=this,n=e("PlayerState"),i="".concat(this.BaseUrl,"Player/UpdatePlayerLevel"),a=new XMLHttpRequest,o=this.NextLevel.match(/\d+/)[0];cc.log("Next Level Digit : ".concat(o));var s="UserId=".concat(n.PlayerId,"&CurrentLevel=").concat(o);a.onreadystatechange=function(){if(4==a.readyState&&a.status>=200&&a.status<400){var e=a.responseText;cc.log("Done Syncing Player State : ".concat(e)),t.MoveToNextLevel(),this.bTryingToMoveToNextLevel=!1}},a.onerror=function(){this.bTryingToMoveToNextLevel=!1,alert("Network Error retrying again in 2 sec"),setTimeout(function(){t.TryToMoveToNextLevel()},2e3)},a.open("POST",i,!0),a.setRequestHeader("Content-type","application/x-www-form-urlencoded"),a.send(s)}},GetGameTime:function(){return this.m_GameTime},SetGameWon:function(e){this.bGameWon=e,this.DetermineGameState()},SetWantToFinishGame:function(e){this.bWantToFinishGame=e,this.DetermineGameState()},SetWantToStartMatch:function(e){this.bGameReadyToStart?(this.bWantsToStartMatch=e,this.DetermineGameState()):cc.log("Game is not Ready to Start")},SetWantToRestartMatch:function(e){this.bWantToRestartMatch=e,this.DetermineGameState()},SetGameState:function(e){var t=this.GameState;t==i.WaitingToStart&&e==i.InMatch&&this.OnStartMatch(),this.GameState=e,t==i.InMatch&&e==i.WaitingToStart&&this.RestartMatch(),t==i.InMatch&&e==i.PendingFinish&&this.ShowVictoryScreen(),t!=i.PendingFinish&&t!=i.InMatch||e!=i.GameEnded||this.TryToMoveToNextLevel(),t==i.WaitingToStart&&e==i.GameEnded&&this.EndGame()},DetermineGameState:function(){var e=i.WaitingToStart;this.bWantToRestartMatch?e=this.bWantsToStartMatch?i.InMatch:i.WaitingToStart:this.bWantsToStartMatch?e=i.InMatch:this.bGameWon&&(e=i.PendingFinish,this.bWantToFinishGame&&(e=i.GameEnded)),console.log("Game State : ".concat(e)),this.SetGameState(e)},OnStartMatch:function(){console.log("Starting Game"),this.m_Player.Reference.getComponent("HeroController").OnMatchStarted(),this.node.emit("OnMatchStarted"),this.bWantsToStartMatch=!1,this.bWantToRestartMatch=!1,this.bWantToFinishGame=!1},RestartMatch:function(){cc.audioEngine.stopAll(),cc.director.loadScene(this.GetSceneName())},RespawnCollectibles:function(){console.table(this.m_AllCollectibles);for(var e=[],t=0;t<this.m_AllCollectibles.length;t++){var n=this.m_AllCollectibles[t];if(!n.bAvailable){var i=new Object;i.Prefab=0==n.Type?this.CoinPrefab:this.SportDrinksPrefab,i.Type=n.Type,i.Position=n.Position,i.IteratorIndex=t,e.push(i)}}for(var a=0;a<e.length;a++){var o=e[a];this.m_AllCollectibles.splice(o.IteratorIndex,1)}for(var s=0;s<e.length;s++){var r=e[s],c=cc.instantiate(r.Prefab);c.parent=this.node.getChildByName("Root"),c.getComponent("Collectibles").CollectibleType=r.Type,c.setPosition(r.Position.x,r.Position.y)}},CollectibleTaken:function(e){for(var t=0;t<this.m_AllCollectibles.length;t++){var n=this.m_AllCollectibles[t];n.Index==e.GetIndex()&&(n.bAvailable=!1)}},OnPlayerDied:function(){this.UpdateAmountOfDeaths(),this.TryRestartGameAfterDeath()},TryRestartGameAfterDeath:function(){var e=this,t=this;setTimeout(function(){e.bHandledPlayerDeath?e.SetWantToRestartMatch(!0):t.TryRestartGameAfterDeath()},3e3)},ReSpawnPlayer:function(){console.log("Spawning New Player"),this.m_Player.Reference.off("PlayerDied",this.OnPlayerDied,this);var e=cc.instantiate(this.HeroPrefab);e.parent=this.node.getChildByName("Root");var t=this.m_Player.Position;e.setPosition(t.x,t.y),e.name="Hero",this.RegisterPlayer(e)},RegisterPlayer:function(e){e&&(this.m_Player&&(this.m_Player={}),this.m_Player.Position=e.position,this.m_Player.Reference=e,e.on("PlayerDied",this.OnPlayerDied,this))},RegisterCollectible:function(e){for(var t=!1,n=0;n<this.m_AllCollectibles.length;n++){if(this.m_AllCollectibles[n]==e){t=!0;break}}if(!t){var i=new Object;i.Position=e.position,i.Type=e.getComponent("Collectibles").CollectibleType,i.bAvailable=!0,i.Index=e.getComponent("Collectibles").GetIndex(),this.m_AllCollectibles.push(i)}},MoveToLevel:function(e){console.log("Moving to next level : ".concat(this.NextLevel)),this.m_Player.Reference.getComponent("HeroController").OnMatchEnded(),cc.audioEngine.stopAll(),cc.director.loadScene(e)},MoveToNextLevel:function(){var t=e("PlayerState"),n=new Object;n.Level=this.GetSceneName(),n.Time=this.GetGameTime(),n.Coins=t.Coins,this.MoveToLevel(this.NextLevel)},EndGame:function(){console.log("Game Ended Thanks for playing")},GetSceneName:function(){for(var e,t=cc.game._sceneInfos,n=0;n<t.length;n++)t[n].uuid==cc.director._scene._id&&(e=(e=t[n].url).substring(e.lastIndexOf("/")+1).match(/[^\.]+/)[0]);return e},ShowVictoryScreen:function(){this.victoryPrefab||console.error("Victory Prefab Is Missiong"),cc.audioEngine.stop(this.BGMId),this.m_Player.Reference.getComponent("HeroController").OnMatchPendingToFinish();var e=cc.instantiate(this.victoryPrefab);e.parent=this.node.getChildByName("Main Camera"),e.position.y-=30}},"update",function(e){0==this.bMusicPlayed&&this.backgroundMusicClip&&this.GameState==i.InMatch&&(this.BGMId=cc.audioEngine.play(this.backgroundMusicClip,!0,1),this.bMusicPlayed=!0)})),cc._RF.pop()},{PlayerState:"PlayerState"}],Global:[function(e,t,n){"use strict";cc._RF.push(t,"f5ccezghUpIyaqMZZZt+qBu","Global"),function e(){var t=cc.director.getPhysicsManager();t?(console.log("Physic Manager Enabled"),t.enabled=!0):setTimeout(function(){e()},16)}(),function e(){var t=cc.director.getCollisionManager();t?(console.log("Collision Manager Enabled"),t.enabled=!0):setTimeout(function(){e()},16)}(),cc._RF.pop()},{}],Goal:[function(e,t,n){"use strict";cc._RF.push(t,"df9a5xHhOBLkaYBFMUqV5ss","Goal"),cc.Class({extends:cc.Component,properties:{},onLoad:function(){},start:function(){},onCollisionEnter:function(e,t){var n=e.getComponent("HeroController");null!=n&&void 0!=n&&cc.find("Canvas").getComponent("GameMode").SetGameWon(!0)}}),cc._RF.pop()},{}],HeroController:[function(e,t,n){"use strict";cc._RF.push(t,"a0740a/wddKp5qYFIiOCdxd","HeroController");cc.macro.ENABLE_TILEDMAP_CULLING=!1,cc.Class({extends:cc.Component,properties:{maxSpeed:500,jumps:1,acceleration:1500,jumpSpeed:200,drag:600,jumpTimeBeforeDeath:2.5,respawnTimer:3,bGameStarted:{default:!1,visible:function(){return!1}},CoinParticlesPrefab:{default:null,type:cc.Prefab},Dead:{get:function(){return this.bDead},visible:function(){return!1}},bPlayJumpAnim:{default:!1},minusLabel:{default:null,type:cc.Prefab},jumpSFX:{default:null,type:cc.AudioClip},onDeathRotateSpeed:500},onLoad:function(){cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN,this.onKeyDown,this),cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP,this.onKeyUp,this),this.m_MoveFlags=0,this.bJump=!1,this.m_RigidBody=this.getComponent(cc.RigidBody),this.m_Speed=cc.v2(0,0),this.bDead=!1,this.m_Jumps=0,this.bOnGround=!0,this.m_CurrentCoins=0,this.m_Stamina=100,this.m_PlayerState=null,this.m_AccumulatedJumpTime=0,this.anim=this.node.getChildByName("Sprite").getComponent(cc.Animation),this.CurrentAnimState="";var e=this;this.CoinParticlesPrefab||cc.loader.loadRes("Prefabs/Particles/CoinsParticle",function(t,n){e.CoinParticlesPrefab=n}),this.minusLabel||cc.loader.loadRes("Prefabs/MinusLabel",function(t,n){e.minusLabel=n}),this.jumpSFX||cc.loader.loadRes("SoundFX/SFX_Jump",function(t,n){e.jumpSFX=n}),this.AllBuffs=[]},start:function(){this.m_PlayerState=e("PlayerState"),this.m_CurrentCoins=this.m_PlayerState.Coins,this.m_MoveFlags|=2},onKeyDown:function(e){switch(e.keyCode){case cc.macro.KEY.a:case cc.macro.KEY.left:break;case cc.macro.KEY.d:case cc.macro.KEY.right:break;case cc.macro.KEY.up:case cc.macro.KEY.w:!this._upPressed&&this.bOnGround&&(this.bJump=!0),this._upPressed=!0}},onKeyUp:function(e){switch(e.keyCode){case cc.macro.KEY.a:case cc.macro.KEY.left:break;case cc.macro.KEY.d:case cc.macro.KEY.right:break;case cc.macro.KEY.up:case cc.macro.KEY.w:this._upPressed=!1}},onBeginContact:function(e,t,n){e.getWorldManifold().normal.y<=-.9&&(this.m_Jumps=this.jumps,this.bOnGround=!0),n.tag},onEndContact:function(e,t,n){e.getWorldManifold().normal.y},update:function(e){if(this.bDead)this.node.angle=Math.min(115,this.node.angle+e*this.onDeathRotateSpeed);else if(this.bGameStarted){if(this.speed=this.m_RigidBody.linearVelocity,1===this.m_MoveFlags)this.node.scaleX>0&&(this.node.scaleX*=-1),this.speed.x-=this.acceleration*e,this.speed.x<-this.maxSpeed&&(this.speed.x=-this.maxSpeed);else if(2===this.m_MoveFlags)this.node.scaleX<0&&(this.node.scaleX*=-1),this.speed.x+=this.acceleration*e,this.speed.x>this.maxSpeed&&(this.speed.x=this.maxSpeed);else if(0!==this.speed.x){var t=this.drag*e;Math.abs(this.speed.x)<=t?this.speed.x=0:this.speed.x-=this.speed.x>0?t:-t}if(this.m_Jumps>0&&this.bJump){this.speed.y=this.jumpSpeed,this.m_Jumps--;cc.audioEngine.play(this.jumpSFX,!1,1);this.PlayAnimation("Jump")}-1*this.speed.y>.01?(this.m_AccumulatedJumpTime+=e,this.m_AccumulatedJumpTime>this.jumpTimeBeforeDeath&&this.OnDeath()):this.m_AccumulatedJumpTime=0,Math.abs(this.speed.y)>.01||(Math.abs(this.speed.x)>.01?this.PlayAnimation("Moving"):this.PlayAnimation("Idle")),this.bJump=!1,this.m_RigidBody.linearVelocity=this.speed}},PlayAnimation:function(e){if(this.CurrentAnimState!=e){var t="";"Idle"==e?t="Idle":"Moving"==e?t="Moving":"Jump"==e&&this.bPlayJumpAnim&&(t="Jump"),this.anim.play(t),this.CurrentAnimState=e}},StopAnimation:function(){this.CurrentAnimState="",this.anim.stop()},DamagePlayer:function(e){e<=0||null==e||(this.m_CurrentCoins<=0?this.OnDeath():(cc.instantiate(this.CoinParticlesPrefab).parent=this.node,this.SetCoins(this.m_CurrentCoins-e)))},SetCoins:function(e){e!=this.m_CurrentCoins&&(this.m_CurrentCoins=Math.max(0,e),this.m_PlayerState.SetCoins(this.m_CurrentCoins))},OnDeath:function(){this.m_MoveFlags&=-3,this.bDead=!0,this.m_RigidBody.type=0,this.m_PlayerState.PlayerDied(),this.node.emit("PlayerDied")},SetWantToJump:function(e){!this.bDead&&this.bGameStarted&&e!=this.bJump&&(this.bJump=e)},OnMovingToNextLevel:function(){this.m_PlayerState.MovingToNextLevel()},CollectedCoins:function(){this.SetCoins(this.m_CurrentCoins+1)},OnMatchStarted:function(){this.bGameStarted=!0},OnMatchPendingToFinish:function(){this.m_RigidBody.type=0,this.bGameStarted=!1},OnMatchEnded:function(){this.m_RigidBody.type=0,this.bGameStarted=!1},RegisterBuff:function(e){this.AllBuffs.push(e),console.log(" Added ".concat(e.node.name))},DeregisterBuff:function(e){var t=this.AllBuffs.indexOf(e);t<=-1||(this.AllBuffs.splice(t,1),console.log(" Removed ".concat(e.node.name)))}}),cc._RF.pop()},{PlayerState:"PlayerState"}],LevelLabel:[function(e,t,n){"use strict";cc._RF.push(t,"2ee6fFG2O9JJ773QDvfCora","LevelLabel"),cc.Class({extends:cc.Component,properties:{labelComponent:{default:null,type:cc.Label}},onLoad:function(){this.m_GameMode=this.FindDeep(cc.director.getScene(),"Canvas").getComponent("GameMode"),this.SceneName=this.m_GameMode.GetSceneName(),this.labelComponent=this.getComponent(cc.Label)},FindDeep:function(e,t){if(e.name==t)return e;for(var n=0;n<e.children.length;n++){var i=this.FindDeep(e.children[n],t);if(i)return i}},start:function(){var e=this.SceneName.replace(/[^0-9](?=[0-9])/g,"$& ");this.labelComponent.string=e}}),cc._RF.pop()},{}],MovingPlatform:[function(e,t,n){"use strict";cc._RF.push(t,"31534Gyz/NIypZyXY0o9pXd","MovingPlatform"),cc.Class({extends:cc.Component,properties:{},start:function(){}}),cc._RF.pop()},{}],NextLevelButton:[function(e,t,n){"use strict";cc._RF.push(t,"d29d9BD7KtFHJTgYyG2y/AK","NextLevelButton"),cc.Class({extends:cc.Component,properties:{},onLoad:function(){var e=new cc.Component.EventHandler;e.target=this.node,e.component="NextLevelButton",e.handler="callback",e.customEventData="NextLevel",this.node.getComponent(cc.Button).clickEvents.push(e),this.m_GameMode=this.FindDeep(cc.director.getScene(),"Canvas").getComponent("GameMode")},callback:function(e,t){e.target.getComponent(cc.Button);this.m_GameMode.SetWantToFinishGame(!0)},FindDeep:function(e,t){if(e.name==t)return e;for(var n=0;n<e.children.length;n++){var i=this.FindDeep(e.children[n],t);if(i)return i}},start:function(){}}),cc._RF.pop()},{}],Obstacle:[function(e,t,n){"use strict";cc._RF.push(t,"5ae3cQVA+BCObq5QWsKTjmG","Obstacle");var i=cc.Enum({Default:0,Puddle:1,Bomb:2});cc.Class({extends:cc.Component,properties:{Damage:{default:1},obstacleType:{default:i.Default,type:i},onHitPlayerSound:{default:[],type:cc.AudioClip},movementSpeed:{default:-200},buffPrefab:{default:null,type:cc.Prefab}},onLoad:function(){var e=this;if(this.buffPrefab||cc.loader.loadRes("Buff/Buff",function(t,n){e.buffPrefab=n}),this.obstacleType==i.Default)for(var t=0;t<4;t++){var n="SoundFX/Obstacle/SFX_Hit".concat(t+1);cc.loader.loadRes(n,function(t,n){e.onHitPlayerSound.push(n)})}if(this.obstacleType==i.Bomb){cc.loader.loadRes("SoundFX/Obstacle/SFX_Explosion",function(t,n){e.onHitPlayerSound.push(n)})}},start:function(){},onCollisionEnter:function(e,t){var n=e.getComponent("HeroController");if(null!=n&&void 0!=n){n.DamagePlayer(this.Damage);var i=cc.instantiate(this.buffPrefab).getComponent("Buff");i.parent=cc.director.getScene(),i.buffType=0,i.lifeSpan=1,i.movementSpeed=this.movementSpeed,i.Activate();var a=Math.round(this.onHitPlayerSound.length%Math.random()*this.onHitPlayerSound.length);console.log("Choosen : ".concat(a));cc.audioEngine.play(this.onHitPlayerSound[a],!1,1)}}}),cc._RF.pop()},{}],ParallaxBG:[function(e,t,n){"use strict";cc._RF.push(t,"87127BiMC5J5IeH+9jNWPrg","ParallaxBG");var i=cc.Enum({Ground:0,Grass:1,Building:2,Cloud:3,Sky:4});cc.Class({extends:cc.Component,properties:{target:{default:null,type:cc.Node},backgroundType:{default:i.Ground,type:i},parallaxSpeed:{default:.8}},onLoad:function(){},TryToGetTarget:function(){this.target=this.FindDeep(cc.director.getScene(),"Main Camera"),this.bFindOnce=!1},FindDeep:function(e,t){if(e.name==t)return e;for(var n=0;n<e.children.length;n++){var i=this.FindDeep(e.children[n],t);if(i)return i}},start:function(){this.TryToGetTarget()},update:function(e){this.TargetPreviousLoc=this.TargetNewLoc?this.TargetNewLoc:this.target.position,this.TargetNewLoc=this.target.position;var t=this.TargetNewLoc.sub(this.TargetPreviousLoc);this.Move(cc.v2(t.x,0))},Move:function(e){e.mulSelf(this.parallaxSpeed);var t=this.node.position;t.addSelf(e),this.node.position=t}}),cc._RF.pop()},{}],PlayerState:[function(e,t,n){"use strict";cc._RF.push(t,"6549eFple9F1oR79xR/dzAA","PlayerState"),t.exports={Coins:0,CurrentLevel:-1,PlayerName:"",PlayerId:-1,PlayerIpAddress:"",PlayerLastLogin:"",PlayerFirstLogin:"",AmountOfDeaths:-1,SetCoins:function(e){e!=this.Coins&&(this.Coins=e)},MovingToNextLevel:function(){},PlayerDied:function(){this.SetCoins(0)}},cc._RF.pop()},{}],SpeedUpPlatform:[function(e,t,n){"use strict";cc._RF.push(t,"d8762XIvlZFI4VgstH7xV/w","SpeedUpPlatform"),cc.Class({extends:cc.Component,properties:{movementSpeed:{default:300},buffPrefab:{default:null,type:cc.Prefab}},onLoad:function(){var e=this;this.buffPrefab||cc.loader.loadRes("Buff/Buff",function(t,n){e.buffPrefab=n})},onCollisionEnter:function(e,t){var n=e.getComponent("HeroController");if(null!=n&&void 0!=n){var i=cc.instantiate(this.buffPrefab).getComponent("Buff");i.parent=cc.director.getScene(),i.buffType=0,i.movementSpeed=this.movementSpeed,i.Activate()}}}),cc._RF.pop()},{}],TouchHandler:[function(e,t,n){"use strict";cc._RF.push(t,"d9a1bNJfGpEa7aIt6FBRiP6","TouchHandler"),cc.Class({extends:cc.Component,properties:{},onLoad:function(){this.node.on("touchstart",this.OnTouchStart,this)},OnTouchStart:function(e){var t=this.node.getParent().getComponent("HeroController");t&&t.SetWantToJump(!0)}}),cc._RF.pop()},{}],UIHelper:[function(e,t,n){"use strict";cc._RF.push(t,"b7cacKhSMVMw6uETW5jp+Q1","UIHelper"),cc.Class({extends:cc.Component,properties:{CoinsLabel:{default:null,type:cc.Label},TimerLabel:{default:null,type:cc.Label},StartGameButton:{default:null,type:cc.Button},LevelSceneLabel:{default:null,type:cc.Node}},onLoad:function(){cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN,this.onKeyDown,this),this.CoinsLabel,this.LevelSceneLabel||(this.LevelSceneLabel=this.node.parent.getChildByName("LevelSceneLabel")),this.m_PState=null,this.m_GameMode=cc.find("Canvas").getComponent("GameMode")},onKeyDown:function(e){if(this.m_GameMode.bDebugMode)switch(e.keyCode){case cc.macro.KEY.tab:cc.log("Cheat activated "),this.m_GameMode.SetGameWon(!0),this.m_GameMode.SetWantToFinishGame(!0)}else cc.log("Not on Debug")},start:function(){this.m_PState=e("PlayerState")},update:function(e){},StartMatch:function(){var e=cc.find("Canvas").getComponent("GameMode");e.bGameReadyToStart?(e.SetWantToStartMatch(!0),this.StartGameButton.node.active=!1,this.LevelSceneLabel.active=!1,e.node.on("OnMatchRestarted",function(){this.StartGameButton.node.active=!0},this)):alert("Loading Data..... WIP Loading Screen")}}),cc._RF.pop()},{PlayerState:"PlayerState"}]},{},["ParallaxBG","Collectibles","Goal","MovingPlatform","Obstacle","SpeedUpPlatform","Buff","CameraControl","HeroController","PlayerState","TouchHandler","GameMode","Global","CoinMinusLabel","LevelLabel","NextLevelButton","UIHelper"]);