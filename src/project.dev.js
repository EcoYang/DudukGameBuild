window.__require = function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var b = o.split("/");
        b = b[b.length - 1];
        if (!t[b]) {
          var a = "function" == typeof __require && __require;
          if (!u && a) return a(b, !0);
          if (i) return i(b, !0);
          throw new Error("Cannot find module '" + o + "'");
        }
        o = b;
      }
      var f = n[o] = {
        exports: {}
      };
      t[o][0].call(f.exports, function(e) {
        var n = t[o][1][e];
        return s(n || e);
      }, f, f.exports, e, t, n, r);
    }
    return n[o].exports;
  }
  var i = "function" == typeof __require && __require;
  for (var o = 0; o < r.length; o++) s(r[o]);
  return s;
}({
  Buff: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "41ffcu56J1J+akFsUM96lOW", "Buff");
    "use strict";
    var BuffTypes = cc.Enum({
      MaxMovementSpeed: 0,
      JumpSpeed: 1
    });
    cc.Class({
      extends: cc.Component,
      properties: {
        lifeSpan: {
          default: 5
        },
        buffType: {
          default: BuffTypes.MaxMovementSpeed,
          type: BuffTypes
        },
        movementSpeed: {
          default: 300,
          visible: function visible() {
            return this.buffType == BuffTypes.MaxMovementSpeed;
          }
        }
      },
      FindDeep: function FindDeep(node, nodeName) {
        if (node.name == nodeName) return node;
        for (var i = 0; i < node.children.length; i++) {
          var res = this.FindDeep(node.children[i], nodeName);
          if (res) return res;
        }
      },
      onLoad: function onLoad() {},
      start: function start() {},
      Activate: function Activate() {
        var _this = this;
        this.Player = this.FindDeep(cc.director.getScene(), "Hero");
        this.Hero = this.Player.getComponent("HeroController");
        this.Hero.RegisterBuff(this);
        this.ApplyBuff();
        var self = this;
        setTimeout(function() {
          _this.OnTimesUp();
          self.node.destroy();
        }, 1e3 * this.lifeSpan);
      },
      ApplyBuff: function ApplyBuff() {
        if (!this.Hero) return;
        switch (this.buffType) {
         case BuffTypes.MaxMovementSpeed:
          this.Hero.maxSpeed += this.movementSpeed;
          this.Hero.acceleration += this.movementSpeed;
          break;

         case BuffTypes.JumpSpeed:
        }
      },
      RemoveBuff: function RemoveBuff() {
        if (!this.Hero) return;
        switch (this.buffType) {
         case BuffTypes.MaxMovementSpeed:
          this.Hero.maxSpeed -= this.movementSpeed;
          this.Hero.acceleration -= this.movementSpeed;
          break;

         case BuffTypes.JumpSpeed:
        }
      },
      OnTimesUp: function OnTimesUp() {
        if (!this.Hero) return;
        this.RemoveBuff();
        this.Hero.DeregisterBuff(this);
      },
      onDestroy: function onDestroy() {}
    });
    cc._RF.pop();
  }, {} ],
  CameraControl: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "a9ec0CgrHJCPLf8WtuLAgTz", "CameraControl");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        target: {
          default: null,
          type: cc.Node
        },
        bUseMargin: {
          default: true
        },
        marginLeft: {
          default: 100,
          visible: function visible() {
            return this.bUseMargin;
          }
        },
        marginRight: {
          default: 100,
          visible: function visible() {
            return this.bUseMargin;
          }
        },
        marginTop: {
          default: 10,
          visible: function visible() {
            return this.bUseMargin;
          }
        },
        marginBottom: {
          default: 10,
          visible: function visible() {
            return this.bUseMargin;
          }
        }
      },
      onLoad: function onLoad() {
        this.target || (this.target = this.FindDeep(cc.director.getScene(), "Hero"));
        this.bFindOnce = false;
      },
      TryToGetTarget: function TryToGetTarget() {
        this.target = this.FindDeep(cc.director.getScene(), "Hero");
        this.bFindOnce = false;
      },
      FindDeep: function FindDeep(node, nodeName) {
        if (node.name == nodeName) return node;
        for (var i = 0; i < node.children.length; i++) {
          var res = this.FindDeep(node.children[i], nodeName);
          if (res) return res;
        }
      },
      lateUpdate: function lateUpdate(dt) {
        var _this = this;
        if (null == this.target || void 0 == this.target || !this.target.active) {
          if (!this.bFindOnce) {
            setTimeout(function() {
              _this.TryToGetTarget();
            }, 100);
            this.bFindOnce = true;
          }
          return;
        }
        if (this.target.getComponent("HeroController").bDead) return;
        var NewPosition = this.node.position;
        if (this.bUseMargin) {
          var XDelta = this.node.position.x - this.target.position.x;
          var YDelta = this.node.position.y - this.target.position.y;
          XDelta > this.marginLeft ? NewPosition.x = this.target.position.x + this.marginLeft : -1 * XDelta > this.marginRight && (NewPosition.x = this.target.position.x - this.marginRight);
          -1 * YDelta > this.marginTop ? NewPosition.y = this.target.position.y - this.marginTop : YDelta > this.marginBottom && (NewPosition.y = this.target.position.y + this.marginBottom);
        }
        this.node.position = NewPosition;
      }
    });
    cc._RF.pop();
  }, {} ],
  CoinMinusLabel: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "60e91GwvKhBvr5ah8CLYRTl", "CoinMinusLabel");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {},
      start: function start() {
        var self = this;
        setTimeout(function() {
          self.node.destroy();
        }, 3e3);
      },
      update: function update(dt) {
        this.node.position = cc.v2(this.node.position.x, this.node.position.y + 250 * dt);
      }
    });
    cc._RF.pop();
  }, {} ],
  Collectibles: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "7de9bJiMuNMMLjrxQh//n9Q", "Collectibles");
    "use strict";
    var CollectibleTypes = cc.Enum({
      Coins: 0,
      SportsDrinks: 1
    });
    var s_Index = 0;
    cc.Class({
      extends: cc.Component,
      properties: {
        CollectibleType: {
          default: CollectibleTypes.Coins,
          type: CollectibleTypes
        },
        buffPrefab: {
          default: null,
          type: cc.Prefab
        },
        movementSpeed: {
          default: 150,
          visible: function visible() {
            return this.CollectibleType == CollectibleTypes.SportsDrinks;
          }
        },
        drinkingSFX: {
          default: null,
          type: cc.AudioClip
        }
      },
      FindDeep: function FindDeep(node, nodeName) {
        if (node.name == nodeName) return node;
        for (var i = 0; i < node.children.length; i++) {
          var res = this.FindDeep(node.children[i], nodeName);
          if (res) return res;
        }
      },
      onLoad: function onLoad() {
        this.m_Index = s_Index++;
        var self = this;
        this.buffPrefab || cc.loader.loadRes("Buff/Buff", function(err, prefab) {
          self.buffPrefab = prefab;
        });
        this.drinkingSFX || cc.loader.loadRes("SoundFX/SFX_Drinking", function(err, sfx) {
          self.drinkingSFX = sfx;
        });
      },
      start: function start() {
        this.m_GameMode = this.FindDeep(cc.director.getScene(), "Canvas").getComponent("GameMode");
        this.m_GameMode.RegisterCollectible(this.node);
      },
      GetIndex: function GetIndex() {
        return this.m_Index;
      },
      onCollisionEnter: function onCollisionEnter(other, self) {
        var HeroController = other.getComponent("HeroController");
        if (null == HeroController || void 0 == HeroController) return;
        if (this.CollectibleType == CollectibleTypes.Coins) HeroController.CollectedCoins(); else if (this.CollectibleType == CollectibleTypes.SportsDrinks) {
          var MovementBuffNode = cc.instantiate(this.buffPrefab);
          var MovementBuff = MovementBuffNode.getComponent("Buff");
          MovementBuff.parent = cc.director.getScene();
          MovementBuff.buffType = 0;
          MovementBuff.movementSpeed = this.movementSpeed;
          MovementBuff.Activate();
          var id = cc.audioEngine.play(this.drinkingSFX, false, 1);
        }
        this.m_GameMode.CollectibleTaken(this);
        this.node.destroy();
      }
    });
    cc._RF.pop();
  }, {} ],
  GameMode: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "11267q+MwpKa6fX8/J8fU6Q", "GameMode");
    "use strict";
    function _defineProperty(obj, key, value) {
      key in obj ? Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      }) : obj[key] = value;
      return obj;
    }
    var GameState = cc.Enum({
      WaitingToStart: 0,
      InMatch: 1,
      PendingFinish: 2,
      GameEnded: 3,
      Paused: 4
    });
    cc.Class(_defineProperty({
      extends: cc.Component,
      properties: {
        GameState: {
          default: GameState.WaitingToStart,
          type: GameState
        },
        HeroPrefab: {
          default: null,
          type: cc.Prefab
        },
        CoinPrefab: {
          default: null,
          type: cc.Prefab
        },
        SportDrinksPrefab: {
          default: null,
          type: cc.Prefab
        },
        backgroundMusicClip: {
          default: null,
          type: cc.AudioClip
        },
        victoryPrefab: {
          default: null,
          type: cc.Prefab
        },
        NextLevel: "",
        CurrentLevel: 0
      },
      onLoad: function onLoad() {
        this.bDebugMode = false;
        this.m_AllCollectibles = new Array();
        this.m_Player = {};
        this.bWantsToStartMatch = false;
        this.bWantToRestartMatch = false;
        this.bWantToFinishGame = false;
        this.bGameWon = false;
        this.m_GameTime = 0;
        var self = this;
        this.bMusicPlayed = false;
        this.BaseUrl = "https://gameapi.duduk.my/api/";
        this.bGameReadyToStart = false;
        this.bHandledPlayerDeath = false;
        this.bTryingToMoveToNextLevel = false;
        this.HeroPrefab || cc.loader.loadRes("Prefabs/Hero", function(err, prefab) {
          self.HeroPrefab = prefab;
        });
        this.CoinPrefab || cc.loader.loadRes("Prefabs/Coins", function(err, prefab) {
          self.CoinPrefab = prefab;
        });
        !this.SportDrinksPrefab;
        this.backgroundMusicClip || cc.loader.loadRes("BGM/Bg", function(err, audioClip) {
          self.backgroundMusicClip = audioClip;
        });
        this.victoryPrefab || cc.loader.loadRes("Prefabs/VictoryPrefab", function(err, prefab) {
          self.victoryPrefab = prefab;
        });
      },
      OnFinishLoading: function OnFinishLoading() {
        this.bGameReadyToStart = true;
        cc.log("Finish Loading Datas from Internet");
      },
      start: function start() {
        var Player = this.node.getChildByName("Root").getChildByName("Hero");
        this.RegisterPlayer(Player);
        this.GetPlayerUserId();
      },
      update: function update(dt) {
        this.GameState == GameState.InMatch && (this.m_GameTime += dt);
      },
      GetPlayerUserId: function GetPlayerUserId() {
        var self = this;
        var url = "https://www.duduk.my/index.php/api/getCurrentUser";
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
          if (4 == xhr.readyState && xhr.status >= 200 && xhr.status < 400) {
            var response = xhr.responseText;
            cc.log("Reponse : ".concat(response));
            var JSONResponse = JSON.parse(response);
            cc.log(JSONResponse);
            var PState = require("PlayerState");
            PState.PlayerId = JSONResponse.userId;
            if (null == PState.PlayerId || -1 == PState.PlayerId) {
              console.error(" ERROR :: CANT GET PLAYER USER ID Using Dummy ID");
              return;
            }
            self.UpdatePlayerLoginTime();
            self.GetPlayerStateData();
          }
        };
        xhr.open("GET", url, true);
        xhr.send();
      },
      GetPlayerStateData: function GetPlayerStateData() {
        var self = this;
        var PState = require("PlayerState");
        var url = "".concat(this.BaseUrl, "Player/GetPlayerStateInfo/").concat(PState.PlayerId);
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
          if (4 == xhr.readyState && xhr.status >= 200 && xhr.status < 400) {
            var response = xhr.responseText;
            var JSONResponse = JSON.parse(response);
            cc.log("Finish Getting Player Data ".concat(response));
            if (null == JSONResponse || 0 == JSONResponse.length || "[]" == JSONResponse) self.InsertNewPlayerData(); else {
              var _PState = require("PlayerState");
              _PState.CurrentLevel = "Level".concat(JSONResponse[0].currentLevel);
              _PState.PlayerName = JSONResponse[0].playerName;
              _PState.Coins = JSONResponse[0].amountCoins;
              _PState.PlayerLastLogin = JSONResponse[0].playerLastLogin;
              _PState.PlayerFirstLogin = JSONResponse[0].playerFirstLogin;
              _PState.AmountOfDeaths = JSONResponse[0].amountOfDeaths;
              cc.log("JSONResponse[0].currentLevel : ".concat(JSONResponse[0].currentLevel));
              cc.log("Current Level : ".concat(self.CurrentLevel));
              if (JSONResponse[0].currentLevel == self.CurrentLevel) {
                self.OnFinishLoading();
                return;
              }
              self.MoveToLevel(_PState.CurrentLevel);
            }
          }
        };
        xhr.open("GET", url, true);
        xhr.send();
      },
      UpdateAmountOfDeaths: function UpdateAmountOfDeaths() {
        var self = this;
        var PState = require("PlayerState");
        var CurrentAmountOfDeaths = PState.AmountOfDeaths;
        var NewAmountOfDeaths = ++CurrentAmountOfDeaths;
        var url = "".concat(this.BaseUrl, "Player/UpdateAmountOfDeath");
        var xhr = new XMLHttpRequest();
        var param = "UserId=".concat(PState.PlayerId, "&AmountOfDeaths=").concat(NewAmountOfDeaths);
        xhr.onreadystatechange = function() {
          if (4 == xhr.readyState && xhr.status >= 200 && xhr.status < 400) {
            var response = xhr.responseText;
            cc.log("Updated Player Amount Of Death : ".concat(response));
            self.bHandledPlayerDeath = true;
          }
        };
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send(param);
      },
      UpdatePlayerLoginTime: function UpdatePlayerLoginTime() {
        var self = this;
        var PState = require("PlayerState");
        var url = "".concat(this.BaseUrl, "Player/UpdateLastLogin");
        var xhr = new XMLHttpRequest();
        var param = "UserId=".concat(PState.PlayerId);
        xhr.onreadystatechange = function() {
          if (4 == xhr.readyState && xhr.status >= 200 && xhr.status < 400) {
            var response = xhr.responseText;
            cc.log("Updated Player Last Login : ".concat(response));
          }
        };
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send(param);
      },
      InsertNewPlayerData: function InsertNewPlayerData() {
        var self = this;
        var PState = require("PlayerState");
        var url = "".concat(this.BaseUrl, "Player/InsertNewPlayer");
        var xhr = new XMLHttpRequest();
        var param = "UserId=".concat(PState.PlayerId);
        xhr.onreadystatechange = function() {
          if (4 == xhr.readyState && xhr.status >= 200 && xhr.status < 400) {
            var response = xhr.responseText;
            cc.log("Inserted New Player : ".concat(response));
            self.OnFinishLoading();
          }
        };
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send(param);
      },
      TryToMoveToNextLevel: function TryToMoveToNextLevel() {
        if (this.bTryingToMoveToNextLevel) return;
        var self = this;
        var PState = require("PlayerState");
        var url = "".concat(this.BaseUrl, "Player/UpdatePlayerLevel");
        var xhr = new XMLHttpRequest();
        var NextLevelDigit = this.NextLevel.match(/\d+/)[0];
        cc.log("Next Level Digit : ".concat(NextLevelDigit));
        var param = "UserId=".concat(PState.PlayerId, "&CurrentLevel=").concat(NextLevelDigit);
        xhr.onreadystatechange = function() {
          if (4 == xhr.readyState && xhr.status >= 200 && xhr.status < 400) {
            var response = xhr.responseText;
            cc.log("Done Syncing Player State : ".concat(response));
            self.MoveToNextLevel();
            this.bTryingToMoveToNextLevel = false;
          }
        };
        xhr.onerror = function() {
          this.bTryingToMoveToNextLevel = false;
          alert("Network Error retrying again in 2 sec");
          setTimeout(function() {
            self.TryToMoveToNextLevel();
          }, 2e3);
        };
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send(param);
      },
      GetGameTime: function GetGameTime() {
        return this.m_GameTime;
      },
      SetGameWon: function SetGameWon(bWon) {
        this.bGameWon = bWon;
        this.DetermineGameState();
      },
      SetWantToFinishGame: function SetWantToFinishGame(bShouldFinish) {
        this.bWantToFinishGame = bShouldFinish;
        this.DetermineGameState();
      },
      SetWantToStartMatch: function SetWantToStartMatch(bShouldStart) {
        if (!this.bGameReadyToStart) {
          cc.log("Game is not Ready to Start");
          return;
        }
        this.bWantsToStartMatch = bShouldStart;
        this.DetermineGameState();
      },
      SetWantToRestartMatch: function SetWantToRestartMatch(bShouldRestart) {
        this.bWantToRestartMatch = bShouldRestart;
        this.DetermineGameState();
      },
      SetGameState: function SetGameState(NewState) {
        var PreviousGameState = this.GameState;
        PreviousGameState == GameState.WaitingToStart && NewState == GameState.InMatch && this.OnStartMatch();
        this.GameState = NewState;
        PreviousGameState == GameState.InMatch && NewState == GameState.WaitingToStart && this.RestartMatch();
        PreviousGameState == GameState.InMatch && NewState == GameState.PendingFinish && this.ShowVictoryScreen();
        PreviousGameState != GameState.PendingFinish && PreviousGameState != GameState.InMatch || NewState != GameState.GameEnded || this.TryToMoveToNextLevel();
        PreviousGameState == GameState.WaitingToStart && NewState == GameState.GameEnded && this.EndGame();
      },
      DetermineGameState: function DetermineGameState() {
        var NewGameState = GameState.WaitingToStart;
        if (this.bWantToRestartMatch) NewGameState = this.bWantsToStartMatch ? GameState.InMatch : GameState.WaitingToStart; else if (this.bWantsToStartMatch) NewGameState = GameState.InMatch; else if (this.bGameWon) {
          NewGameState = GameState.PendingFinish;
          this.bWantToFinishGame && (NewGameState = GameState.GameEnded);
        }
        console.log("Game State : ".concat(NewGameState));
        this.SetGameState(NewGameState);
      },
      OnStartMatch: function OnStartMatch() {
        console.log("Starting Game");
        this.m_Player["Reference"].getComponent("HeroController").OnMatchStarted();
        this.node.emit("OnMatchStarted");
        this.bWantsToStartMatch = false;
        this.bWantToRestartMatch = false;
        this.bWantToFinishGame = false;
      },
      RestartMatch: function RestartMatch() {
        cc.audioEngine.stopAll();
        cc.director.loadScene(this.GetSceneName());
      },
      RespawnCollectibles: function RespawnCollectibles() {
        console.table(this.m_AllCollectibles);
        var CollectiblesToSpawn = [];
        for (var i = 0; i < this.m_AllCollectibles.length; i++) {
          var Element = this.m_AllCollectibles[i];
          if (Element.bAvailable) continue;
          var ElementToSpawn = new Object();
          ElementToSpawn.Prefab = 0 == Element.Type ? this.CoinPrefab : this.SportDrinksPrefab;
          ElementToSpawn.Type = Element.Type;
          ElementToSpawn.Position = Element.Position;
          ElementToSpawn.IteratorIndex = i;
          CollectiblesToSpawn.push(ElementToSpawn);
        }
        for (var _i = 0; _i < CollectiblesToSpawn.length; _i++) {
          var _Element = CollectiblesToSpawn[_i];
          this.m_AllCollectibles.splice(_Element.IteratorIndex, 1);
        }
        for (var _i2 = 0; _i2 < CollectiblesToSpawn.length; _i2++) {
          var _Element2 = CollectiblesToSpawn[_i2];
          var SpawnedCollectibles = cc.instantiate(_Element2.Prefab);
          SpawnedCollectibles.parent = this.node.getChildByName("Root");
          SpawnedCollectibles.getComponent("Collectibles").CollectibleType = _Element2.Type;
          SpawnedCollectibles.setPosition(_Element2.Position.x, _Element2.Position.y);
        }
      },
      CollectibleTaken: function CollectibleTaken(Collectible) {
        for (var i = 0; i < this.m_AllCollectibles.length; i++) {
          var Element = this.m_AllCollectibles[i];
          if (Element.Index != Collectible.GetIndex()) continue;
          Element.bAvailable = false;
        }
      },
      OnPlayerDied: function OnPlayerDied() {
        this.UpdateAmountOfDeaths();
        this.TryRestartGameAfterDeath();
      },
      TryRestartGameAfterDeath: function TryRestartGameAfterDeath() {
        var _this = this;
        var self = this;
        setTimeout(function() {
          if (!_this.bHandledPlayerDeath) {
            self.TryRestartGameAfterDeath();
            return;
          }
          _this.SetWantToRestartMatch(true);
        }, 3e3);
      },
      ReSpawnPlayer: function ReSpawnPlayer() {
        console.log("Spawning New Player");
        this.m_Player["Reference"].off("PlayerDied", this.OnPlayerDied, this);
        var NewPlayer = cc.instantiate(this.HeroPrefab);
        NewPlayer.parent = this.node.getChildByName("Root");
        var NewPos = this.m_Player["Position"];
        NewPlayer.setPosition(NewPos.x, NewPos.y);
        NewPlayer.name = "Hero";
        this.RegisterPlayer(NewPlayer);
      },
      RegisterPlayer: function RegisterPlayer(NewPlayer) {
        if (!NewPlayer) return;
        this.m_Player && (this.m_Player = {});
        this.m_Player["Position"] = NewPlayer.position;
        this.m_Player["Reference"] = NewPlayer;
        NewPlayer.on("PlayerDied", this.OnPlayerDied, this);
      },
      RegisterCollectible: function RegisterCollectible(NewCollectibles) {
        var bExists = false;
        for (var i = 0; i < this.m_AllCollectibles.length; i++) {
          var element = this.m_AllCollectibles[i];
          if (element != NewCollectibles) continue;
          bExists = true;
          break;
        }
        if (bExists) return;
        var NewObj = new Object();
        NewObj.Position = NewCollectibles.position;
        NewObj.Type = NewCollectibles.getComponent("Collectibles").CollectibleType;
        NewObj.bAvailable = true;
        NewObj.Index = NewCollectibles.getComponent("Collectibles").GetIndex();
        this.m_AllCollectibles.push(NewObj);
      },
      MoveToLevel: function MoveToLevel(LevelToMove) {
        console.log("Moving to next level : ".concat(this.NextLevel));
        this.m_Player["Reference"].getComponent("HeroController").OnMatchEnded();
        cc.audioEngine.stopAll();
        cc.director.loadScene(LevelToMove);
      },
      MoveToNextLevel: function MoveToNextLevel() {
        var PState = require("PlayerState");
        var NewObj = new Object();
        NewObj.Level = this.GetSceneName();
        NewObj.Time = this.GetGameTime();
        NewObj.Coins = PState.Coins;
        this.MoveToLevel(this.NextLevel);
      },
      EndGame: function EndGame() {
        console.log("Game Ended Thanks for playing");
      },
      GetSceneName: function GetSceneName() {
        var sceneName;
        var _sceneInfos = cc.game._sceneInfos;
        for (var i = 0; i < _sceneInfos.length; i++) {
          if (_sceneInfos[i].uuid != cc.director._scene._id) continue;
          sceneName = _sceneInfos[i].url;
          sceneName = sceneName.substring(sceneName.lastIndexOf("/") + 1).match(/[^\.]+/)[0];
        }
        return sceneName;
      },
      ShowVictoryScreen: function ShowVictoryScreen() {
        this.victoryPrefab || console.error("Victory Prefab Is Missiong");
        cc.audioEngine.stop(this.BGMId);
        this.m_Player["Reference"].getComponent("HeroController").OnMatchPendingToFinish();
        var VictoryThingy = cc.instantiate(this.victoryPrefab);
        VictoryThingy.parent = this.node.getChildByName("Main Camera");
        VictoryThingy.position.y -= 30;
      }
    }, "update", function update(dt) {
      if (false == this.bMusicPlayed && this.backgroundMusicClip && this.GameState == GameState.InMatch) {
        this.BGMId = cc.audioEngine.play(this.backgroundMusicClip, true, 1);
        this.bMusicPlayed = true;
      }
    }));
    cc._RF.pop();
  }, {
    PlayerState: "PlayerState"
  } ],
  Global: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f5ccezghUpIyaqMZZZt+qBu", "Global");
    "use strict";
    function EnablePhysicManager() {
      var physicsManager = cc.director.getPhysicsManager();
      if (!physicsManager) {
        setTimeout(function() {
          EnablePhysicManager();
        }, 16);
        return;
      }
      console.log("Physic Manager Enabled");
      physicsManager.enabled = true;
    }
    function EnableCollisionManager() {
      var collisionManager = cc.director.getCollisionManager();
      if (!collisionManager) {
        setTimeout(function() {
          EnableCollisionManager();
        }, 16);
        return;
      }
      console.log("Collision Manager Enabled");
      collisionManager.enabled = true;
    }
    EnablePhysicManager();
    EnableCollisionManager();
    cc._RF.pop();
  }, {} ],
  Goal: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "df9a5xHhOBLkaYBFMUqV5ss", "Goal");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {},
      onLoad: function onLoad() {},
      start: function start() {},
      onCollisionEnter: function onCollisionEnter(other, self) {
        var HeroController = other.getComponent("HeroController");
        if (null == HeroController || void 0 == HeroController) return;
        var GameMode = cc.find("Canvas").getComponent("GameMode");
        GameMode.SetGameWon(true);
      }
    });
    cc._RF.pop();
  }, {} ],
  HeroController: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "a0740a/wddKp5qYFIiOCdxd", "HeroController");
    "use strict";
    var MOVE_LEFT = 1;
    var MOVE_RIGHT = 2;
    cc.macro.ENABLE_TILEDMAP_CULLING = false;
    cc.Class({
      extends: cc.Component,
      properties: {
        maxSpeed: 500,
        jumps: 1,
        acceleration: 1500,
        jumpSpeed: 200,
        drag: 600,
        jumpTimeBeforeDeath: 2.5,
        respawnTimer: 3,
        bGameStarted: {
          default: false,
          visible: function visible() {
            return false;
          }
        },
        CoinParticlesPrefab: {
          default: null,
          type: cc.Prefab
        },
        Dead: {
          get: function get() {
            return this.bDead;
          },
          visible: function visible() {
            return false;
          }
        },
        bPlayJumpAnim: {
          default: false
        },
        minusLabel: {
          default: null,
          type: cc.Prefab
        },
        jumpSFX: {
          default: null,
          type: cc.AudioClip
        },
        onDeathRotateSpeed: 500
      },
      onLoad: function onLoad() {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        this.m_MoveFlags = 0;
        this.bJump = false;
        this.m_RigidBody = this.getComponent(cc.RigidBody);
        this.m_Speed = cc.v2(0, 0);
        this.bDead = false;
        this.m_Jumps = 0;
        this.bOnGround = true;
        this.m_CurrentCoins = 0;
        this.m_Stamina = 100;
        this.m_PlayerState = null;
        this.m_AccumulatedJumpTime = 0;
        this.m_AccumulatedDropTime = 0;
        this.anim = this.node.getChildByName("Sprite").getComponent(cc.Animation);
        this.CurrentAnimState = "";
        var self = this;
        this.CoinParticlesPrefab || cc.loader.loadRes("Prefabs/Particles/CoinsParticle", function(err, prefab) {
          self.CoinParticlesPrefab = prefab;
        });
        this.minusLabel || cc.loader.loadRes("Prefabs/MinusLabel", function(err, prefab) {
          self.minusLabel = prefab;
        });
        this.jumpSFX || cc.loader.loadRes("SoundFX/SFX_Jump", function(err, sfx) {
          self.jumpSFX = sfx;
        });
        this.AllBuffs = [];
      },
      start: function start() {
        this.m_PlayerState = require("PlayerState");
        this.m_CurrentCoins = this.m_PlayerState.Coins;
        this.m_MoveFlags |= MOVE_RIGHT;
      },
      onKeyDown: function onKeyDown(event) {
        switch (event.keyCode) {
         case cc.macro.KEY.a:
         case cc.macro.KEY.left:
          break;

         case cc.macro.KEY.d:
         case cc.macro.KEY.right:
          break;

         case cc.macro.KEY.up:
         case cc.macro.KEY.w:
          !this._upPressed && this.bOnGround && (this.bJump = true);
          this._upPressed = true;
        }
      },
      onKeyUp: function onKeyUp(event) {
        switch (event.keyCode) {
         case cc.macro.KEY.a:
         case cc.macro.KEY.left:
          break;

         case cc.macro.KEY.d:
         case cc.macro.KEY.right:
          break;

         case cc.macro.KEY.up:
         case cc.macro.KEY.w:
          this._upPressed = false;
        }
      },
      onBeginContact: function onBeginContact(contact, selfCollider, otherCollider) {
        var WorldManifold = contact.getWorldManifold();
        if (WorldManifold.normal.y <= -.9) {
          this.m_Jumps = this.jumps;
          this.bOnGround = true;
        }
        100 === otherCollider.tag;
      },
      onEndContact: function onEndContact(contact, selfCollider, otherCollider) {
        var WorldManifold = contact.getWorldManifold();
        WorldManifold.normal.y <= -.9;
      },
      update: function update(dt) {
        if (this.bDead) {
          this.node.angle = Math.min(115, this.node.angle + dt * this.onDeathRotateSpeed);
          this.node.position = cc.v2(this.node.position.x, this.node.position.y + (1 - this.m_AccumulatedDropTime / 100 + 15));
          this.m_AccumulatedDropTime += 5500 * dt;
          return;
        }
        if (!this.bGameStarted) return;
        this.speed = this.m_RigidBody.linearVelocity;
        if (this.m_MoveFlags === MOVE_LEFT) {
          this.node.scaleX > 0 && (this.node.scaleX *= -1);
          this.speed.x -= this.acceleration * dt;
          this.speed.x < -this.maxSpeed && (this.speed.x = -this.maxSpeed);
        } else if (this.m_MoveFlags === MOVE_RIGHT) {
          this.node.scaleX < 0 && (this.node.scaleX *= -1);
          this.speed.x += this.acceleration * dt;
          this.speed.x > this.maxSpeed && (this.speed.x = this.maxSpeed);
        } else if (0 !== this.speed.x) {
          var d = this.drag * dt;
          Math.abs(this.speed.x) <= d ? this.speed.x = 0 : this.speed.x -= this.speed.x > 0 ? d : -d;
        }
        if (this.m_Jumps > 0 && this.bJump) {
          this.speed.y = this.jumpSpeed;
          this.m_Jumps--;
          var id = cc.audioEngine.play(this.jumpSFX, false, .5);
          this.PlayAnimation("Jump");
        }
        if (-1 * this.speed.y > .01) {
          this.m_AccumulatedJumpTime += dt;
          this.m_AccumulatedJumpTime > this.jumpTimeBeforeDeath && this.OnDeath();
        } else this.m_AccumulatedJumpTime = 0;
        Math.abs(this.speed.y) > .01 || (Math.abs(this.speed.x) > .01 ? this.PlayAnimation("Moving") : this.PlayAnimation("Idle"));
        this.bJump = false;
        this.m_RigidBody.linearVelocity = this.speed;
      },
      PlayAnimation: function PlayAnimation(AnimName) {
        if (this.CurrentAnimState == AnimName) return;
        var NewAnim = "";
        "Idle" == AnimName ? NewAnim = "Idle" : "Moving" == AnimName ? NewAnim = "Moving" : "Jump" == AnimName && this.bPlayJumpAnim && (NewAnim = "Jump");
        this.anim.play(NewAnim);
        this.CurrentAnimState = AnimName;
      },
      StopAnimation: function StopAnimation() {
        this.CurrentAnimState = "";
        this.anim.stop();
      },
      DamagePlayer: function DamagePlayer(Damage) {
        if (Damage <= 0 || null == Damage) return;
        if (this.m_CurrentCoins <= 0) {
          this.OnDeath();
          return;
        }
        var SpawnedCoinParticles = cc.instantiate(this.CoinParticlesPrefab);
        SpawnedCoinParticles.parent = this.node;
        this.SetCoins(this.m_CurrentCoins - Damage);
      },
      SetCoins: function SetCoins(NewVal) {
        if (NewVal == this.m_CurrentCoins) return;
        this.m_CurrentCoins = Math.max(0, NewVal);
        this.m_PlayerState.SetCoins(this.m_CurrentCoins);
      },
      OnDeath: function OnDeath() {
        this.m_MoveFlags &= ~MOVE_RIGHT;
        this.bDead = true;
        this.m_RigidBody.type = 0;
        this.m_PlayerState.PlayerDied();
        this.node.emit("PlayerDied");
      },
      SetWantToJump: function SetWantToJump(bShouldJump) {
        if (this.bDead || !this.bGameStarted || bShouldJump == this.bJump) return;
        this.bJump = bShouldJump;
      },
      OnMovingToNextLevel: function OnMovingToNextLevel() {
        this.m_PlayerState.MovingToNextLevel();
      },
      CollectedCoins: function CollectedCoins() {
        this.SetCoins(this.m_CurrentCoins + 1);
      },
      OnMatchStarted: function OnMatchStarted() {
        this.bGameStarted = true;
      },
      OnMatchPendingToFinish: function OnMatchPendingToFinish() {
        this.m_RigidBody.type = 0;
        this.bGameStarted = false;
      },
      OnMatchEnded: function OnMatchEnded() {
        this.m_RigidBody.type = 0;
        this.bGameStarted = false;
      },
      RegisterBuff: function RegisterBuff(Buff) {
        this.AllBuffs.push(Buff);
        console.log(" Added ".concat(Buff.node.name));
      },
      DeregisterBuff: function DeregisterBuff(Buff) {
        var Index = this.AllBuffs.indexOf(Buff);
        if (Index <= -1) return;
        this.AllBuffs.splice(Index, 1);
        console.log(" Removed ".concat(Buff.node.name));
      }
    });
    cc._RF.pop();
  }, {
    PlayerState: "PlayerState"
  } ],
  LevelLabel: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "2ee6fFG2O9JJ773QDvfCora", "LevelLabel");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        labelComponent: {
          default: null,
          type: cc.Label
        }
      },
      onLoad: function onLoad() {
        this.m_GameMode = this.FindDeep(cc.director.getScene(), "Canvas").getComponent("GameMode");
        this.SceneName = this.m_GameMode.GetSceneName();
        this.labelComponent = this.getComponent(cc.Label);
      },
      FindDeep: function FindDeep(node, nodeName) {
        if (node.name == nodeName) return node;
        for (var i = 0; i < node.children.length; i++) {
          var res = this.FindDeep(node.children[i], nodeName);
          if (res) return res;
        }
      },
      start: function start() {
        var RegularExp = /[^0-9](?=[0-9])/g;
        var LevelName = this.SceneName.replace(RegularExp, "$& ");
        this.labelComponent.string = LevelName;
      }
    });
    cc._RF.pop();
  }, {} ],
  MovingPlatform: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "31534Gyz/NIypZyXY0o9pXd", "MovingPlatform");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {},
      start: function start() {}
    });
    cc._RF.pop();
  }, {} ],
  NextLevelButton: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d29d9BD7KtFHJTgYyG2y/AK", "NextLevelButton");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {},
      onLoad: function onLoad() {
        var clickEventHandler = new cc.Component.EventHandler();
        clickEventHandler.target = this.node;
        clickEventHandler.component = "NextLevelButton";
        clickEventHandler.handler = "callback";
        clickEventHandler.customEventData = "NextLevel";
        var button = this.node.getComponent(cc.Button);
        button.clickEvents.push(clickEventHandler);
        this.m_GameMode = this.FindDeep(cc.director.getScene(), "Canvas").getComponent("GameMode");
      },
      callback: function callback(event, customEventData) {
        var node = event.target;
        var button = node.getComponent(cc.Button);
        this.m_GameMode.SetWantToFinishGame(true);
      },
      FindDeep: function FindDeep(node, nodeName) {
        if (node.name == nodeName) return node;
        for (var i = 0; i < node.children.length; i++) {
          var res = this.FindDeep(node.children[i], nodeName);
          if (res) return res;
        }
      },
      start: function start() {}
    });
    cc._RF.pop();
  }, {} ],
  Obstacle: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "5ae3cQVA+BCObq5QWsKTjmG", "Obstacle");
    "use strict";
    var ObstacleType = cc.Enum({
      Default: 0,
      Puddle: 1,
      Bomb: 2
    });
    cc.Class({
      extends: cc.Component,
      properties: {
        Damage: {
          default: 1
        },
        obstacleType: {
          default: ObstacleType.Default,
          type: ObstacleType
        },
        onHitPlayerSound: {
          default: [],
          type: cc.AudioClip
        },
        movementSpeed: {
          default: -200
        },
        buffPrefab: {
          default: null,
          type: cc.Prefab
        }
      },
      onLoad: function onLoad() {
        var self = this;
        this.buffPrefab || cc.loader.loadRes("Buff/Buff", function(err, prefab) {
          self.buffPrefab = prefab;
        });
        if (this.obstacleType == ObstacleType.Default) for (var it = 0; it < 4; it++) {
          var SFXPath = "SoundFX/Obstacle/SFX_Hit".concat(it + 1);
          cc.loader.loadRes(SFXPath, function(err, audioClip) {
            self.onHitPlayerSound.push(audioClip);
          });
        }
        if (this.obstacleType == ObstacleType.Bomb) {
          var _SFXPath = "SoundFX/Obstacle/SFX_Explosion";
          cc.loader.loadRes(_SFXPath, function(err, audioClip) {
            self.onHitPlayerSound.push(audioClip);
          });
        }
      },
      start: function start() {},
      onCollisionEnter: function onCollisionEnter(other, self) {
        var HeroController = other.getComponent("HeroController");
        if (null == HeroController || void 0 == HeroController || HeroController.bDead) return;
        HeroController.DamagePlayer(this.Damage);
        var MovementBuffNode = cc.instantiate(this.buffPrefab);
        var MovementBuff = MovementBuffNode.getComponent("Buff");
        MovementBuff.parent = cc.director.getScene();
        MovementBuff.buffType = 0;
        MovementBuff.lifeSpan = 1;
        MovementBuff.movementSpeed = this.movementSpeed;
        MovementBuff.Activate();
        var ChoosenAudioIndex = Math.round(this.onHitPlayerSound.length % Math.random() * this.onHitPlayerSound.length);
        console.log("Choosen : ".concat(ChoosenAudioIndex));
        var id = cc.audioEngine.play(this.onHitPlayerSound[ChoosenAudioIndex], false, 1);
      }
    });
    cc._RF.pop();
  }, {} ],
  ParallaxBG: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "87127BiMC5J5IeH+9jNWPrg", "ParallaxBG");
    "use strict";
    var BackgroundType = cc.Enum({
      Ground: 0,
      Grass: 1,
      Building: 2,
      Cloud: 3,
      Sky: 4
    });
    cc.Class({
      extends: cc.Component,
      properties: {
        target: {
          default: null,
          type: cc.Node
        },
        backgroundType: {
          default: BackgroundType.Ground,
          type: BackgroundType
        },
        parallaxSpeed: {
          default: .8
        }
      },
      onLoad: function onLoad() {},
      TryToGetTarget: function TryToGetTarget() {
        this.target = this.FindDeep(cc.director.getScene(), "Main Camera");
        this.bFindOnce = false;
      },
      FindDeep: function FindDeep(node, nodeName) {
        if (node.name == nodeName) return node;
        for (var i = 0; i < node.children.length; i++) {
          var res = this.FindDeep(node.children[i], nodeName);
          if (res) return res;
        }
      },
      start: function start() {
        this.TryToGetTarget();
      },
      update: function update(dt) {
        this.TargetPreviousLoc = this.TargetNewLoc ? this.TargetNewLoc : this.target.position;
        this.TargetNewLoc = this.target.position;
        var LocationDelta = this.TargetNewLoc.sub(this.TargetPreviousLoc);
        this.Move(cc.v2(LocationDelta.x, 0));
      },
      Move: function Move(DeltaLocation) {
        DeltaLocation.mulSelf(this.parallaxSpeed);
        var NewPosition = this.node.position;
        NewPosition.addSelf(DeltaLocation);
        this.node.position = NewPosition;
      }
    });
    cc._RF.pop();
  }, {} ],
  PlayerState: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "6549eFple9F1oR79xR/dzAA", "PlayerState");
    "use strict";
    module.exports = {
      Coins: 0,
      CurrentLevel: -1,
      PlayerName: "",
      PlayerId: -1,
      PlayerIpAddress: "",
      PlayerLastLogin: "",
      PlayerFirstLogin: "",
      AmountOfDeaths: -1,
      SetCoins: function SetCoins(NewVal) {
        if (NewVal == this.Coins) return;
        this.Coins = NewVal;
      },
      MovingToNextLevel: function MovingToNextLevel() {},
      PlayerDied: function PlayerDied() {
        this.SetCoins(0);
      }
    };
    cc._RF.pop();
  }, {} ],
  SpeedUpPlatform: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d8762XIvlZFI4VgstH7xV/w", "SpeedUpPlatform");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        movementSpeed: {
          default: 300
        },
        buffPrefab: {
          default: null,
          type: cc.Prefab
        }
      },
      onLoad: function onLoad() {
        var self = this;
        this.buffPrefab || cc.loader.loadRes("Buff/Buff", function(err, prefab) {
          self.buffPrefab = prefab;
        });
      },
      onCollisionEnter: function onCollisionEnter(other, self) {
        var HeroController = other.getComponent("HeroController");
        if (null == HeroController || void 0 == HeroController) return;
        var MovementBuffNode = cc.instantiate(this.buffPrefab);
        var MovementBuff = MovementBuffNode.getComponent("Buff");
        MovementBuff.parent = cc.director.getScene();
        MovementBuff.buffType = 0;
        MovementBuff.movementSpeed = this.movementSpeed;
        MovementBuff.Activate();
      }
    });
    cc._RF.pop();
  }, {} ],
  TouchHandler: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d9a1bNJfGpEa7aIt6FBRiP6", "TouchHandler");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {},
      onLoad: function onLoad() {
        this.node.on("touchstart", this.OnTouchStart, this);
      },
      OnTouchStart: function OnTouchStart(event) {
        var HeroController = this.node.getParent().getComponent("HeroController");
        if (!HeroController) return;
        HeroController.SetWantToJump(true);
      }
    });
    cc._RF.pop();
  }, {} ],
  UIHelper: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b7cacKhSMVMw6uETW5jp+Q1", "UIHelper");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        CoinsLabel: {
          default: null,
          type: cc.Label
        },
        TimerLabel: {
          default: null,
          type: cc.Label
        },
        StartGameButton: {
          default: null,
          type: cc.Button
        },
        LevelSceneLabel: {
          default: null,
          type: cc.Node
        }
      },
      onLoad: function onLoad() {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        !this.CoinsLabel;
        this.LevelSceneLabel || (this.LevelSceneLabel = this.node.parent.getChildByName("LevelSceneLabel"));
        this.m_PState = null;
        this.m_GameMode = cc.find("Canvas").getComponent("GameMode");
      },
      onKeyDown: function onKeyDown(event) {
        if (!this.m_GameMode.bDebugMode) {
          cc.log("Not on Debug");
          return;
        }
        switch (event.keyCode) {
         case cc.macro.KEY.tab:
          cc.log("Cheat activated ");
          this.m_GameMode.SetGameWon(true);
          this.m_GameMode.SetWantToFinishGame(true);
        }
      },
      start: function start() {
        this.m_PState = require("PlayerState");
      },
      update: function update(dt) {},
      StartMatch: function StartMatch() {
        var GameMode = cc.find("Canvas").getComponent("GameMode");
        if (!GameMode.bGameReadyToStart) {
          alert("Loading Data..... WIP Loading Screen");
          return;
        }
        GameMode.SetWantToStartMatch(true);
        this.StartGameButton.node.active = false;
        this.LevelSceneLabel.active = false;
        GameMode.node.on("OnMatchRestarted", function() {
          this.StartGameButton.node.active = true;
        }, this);
      }
    });
    cc._RF.pop();
  }, {
    PlayerState: "PlayerState"
  } ]
}, {}, [ "ParallaxBG", "Collectibles", "Goal", "MovingPlatform", "Obstacle", "SpeedUpPlatform", "Buff", "CameraControl", "HeroController", "PlayerState", "TouchHandler", "GameMode", "Global", "CoinMinusLabel", "LevelLabel", "NextLevelButton", "UIHelper" ]);