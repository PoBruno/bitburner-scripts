# Disclaimer

Este é meu próprio repositório de scripts para jogar o Bitburner.
Meus script de farming foi baseado nos scripts de [malaclypse2](https://github.com/malaclypse2/bitburner-scripts-1) junto com codigo de UI com informações.

# Download

Execute `nano git-pull.js` no terminal e copie o [git-pull.js](https://raw.githubusercontent.com/pobruno/bitburner-scripts/main/git-pull.js)
`nano git-pull.js`
Wwget direto no terminal `wget https://raw.githubusercontent.com/pobruno/bitburner-scripts/main/git-pull.js git-pull.js`


## Aliases de Farming
- `alias git-pull="run git-pull.js"`
- `alias start="run daemon.js -v --stock-manipulation --tail"`
- `alias stop="home; kill daemon.js -v --stock-manipulation; execute cascade-kill.js"`
- `alias sscan="home; execute scan.js"`
- `alias do="run run-command.js"`
    - Isso permite executar comandos ns a partir do terminal, como `do ns.getPlayer()`, `do Object.keys(ns)` ou `do ns.getServerMoneyAvailable('n00dles')`
- `alias reserve="run reserve.js"`
    - Você pode executar, por exemplo `reserve 100m` para reservar. Todos os scripts com um componente de gasto automático devem respeitar essa reserva.
- `alias liquidate="home; execute stockmaster.js --liquidate; execute gaste-hacknet-hashes.js --liquidate;"`
    - Vender rapidamente todas as ações e hashes de hacknet. (útil antes de redefinir)
- `facman="run faction-manager.js"`
    - Veja rapidamente quais aprimoramentos você pode comprar. Em seguida, use `facman --purchase` para puxar o gatilho.
    
- `alias gaste-on-ram="run Tasks/ram-manager.js --reserve 0 --budget 1 --tail"`
- `alias gaste-on-gangs="run gangs.js --reserve 0 --augmentations-budget 1 --equipment-budget 1 --tail"`
- `alias gaste-on-sleeves="run sleeve.js --aug-budget 1 --min-aug-batch 1 --buy-cooldown 0 --reserve 0 --tail"`
    - Em sua própria ordem de prioridade gasta tudo o que puder em aprimoramentos. (útil antes de redefinir)
- `alias stock="run stockmaster.js --fracH 0.001 --fracB 0.1 --show-pre-4s-forecast --noisy --tail --reserve 100000000"`
    - Investe todo o dinheiro no mercado de ações e acompanha o progresso.
- `alias crime="run crime.js --tail --fast-crimes-only"`
- `alias work="run work-for-factions.js --fast-crimes-only"`
- `alias start-tight="run daemon.js --looping-mode --recovery-thread-padding 30 --cycle-timing-delay 2000 --queue-delay 10 --stock-manipulation-focus --tail --silent-misfires --initial-max-targets 64"`


# Configurando UI
Alias para comando da UI tem como referencia ***net*** 

```alias net="run /scripts/net.js"```.

[./scripts/net.js](./scripts/net.js) é o sistema de comando e controle.
O [net-monitor.js](./scripts/net.js) executa alguns monitores sofisticados do que o sistema está fazendo.
[bitlib.js](./scripts/bit-lib.js) tenta consolidar o código não específico do aplicativo
Há também algumas coisas de configuração em [bitlib.js](./scripts/bit-lib.js) e mais espalhadas em [net.js](./scripts/net.js) e [net-monitor.js](./scripts/net.js).

O script 'net' destina-se a iniciar, parar e controlar tudo o que você tem em execução. Alguns comandos para tentar:
Defina o alias: ```alias net="run /scripts/net.js"```

```
net monitor
net mon targets1up
net monitor targets2up

net start
net stop
net stop daemon
net restart

net tail
net tail <subsystem>

net server list
net server prices
net server buy 20
net server delete 1
```  

você pode configurar o CSS executando ```run /box/cssEdit.js```.


