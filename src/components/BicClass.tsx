import BicType, { UpgradeType } from "../types/Bic";
import { increment } from "../redux/slices/clickSlice";
import { RootState } from "../redux/store";

export class BicClass implements BicType {

  multiplier = 1;
  clickBase = 1;
  bicPaint = 100;
  bonus = false;
  dispatch: any;

  static localSave(status: RootState) {
    // Salva os dados atuais do jogador localmente
    localStorage.setItem("save", JSON.stringify(status));
  }

  setDispatch(dispatch: any): void {
    this.dispatch = dispatch;
  }

  multiplierUpgrade(upgrade: UpgradeType): void {
    // Verifica o tipo do upgrade e o atualiza
    upgrade.type === "clickBase" ? (this.clickBase += upgrade.value) : (this.multiplier += upgrade.value)

  }

  bicClick() {
    this.bicPaint -= 1;
    if (this.bicPaint <= 0) { this.bicEnough(); }

    const chanceToExplode = Math.floor(Math.random() * 100);
    if (this.bonus === false && (chanceToExplode > 0 && chanceToExplode < 2)) { this.bicExplode() }
    // Incrementa o dinheiro usando a multiplicação do click base com o multiplicador
    this.dispatch(increment(this.clickBase * this.multiplier));
  }

  bicEnough(): void {
    // baseClick elevado ao multiplicador
    this.dispatch(increment((this.clickBase ** this.multiplier) + 100));
    this.bicPaint = 100;
  }

  bicExplode(): void {
    console.log("bonus start")
    this.bonus = true;
    // Incrementa em 10x o multiplicador por 60 segundos
    this.multiplier *= 10;

    setTimeout(() => {
      this.multiplier /= 10
      this.bonus = false
      console.log("bonus end")
    }, 60000);

  }
}

export default new BicClass();