class Admin::DappsController < Admin::ApplicationController
  before_action :set_dapp, only: [:show, :edit, :update, :destroy]

  # GET /dapps
  # GET /dapps.json
  def index
    @dapps = Dapp.order(updated_at: :desc).page(params[:page])
  end

  # GET /dapps/1
  # GET /dapps/1.json
  def show
  end

  # GET /dapps/new
  def new
    @dapp = Dapp.new
  end

  # GET /dapps/1/edit
  def edit
  end

  # POST /dapps
  # POST /dapps.json
  def create
    @dapp = Dapp.new(dapp_params)

    respond_to do |format|
      if @dapp.save
        format.html { redirect_to admin_dapp_path(@dapp), notice: 'Dapp was successfully created.' }
        format.json { render :show, status: :created, location: @dapp }
      else
        format.html { render :new }
        format.json { render json: @dapp.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /dapps/1
  # PATCH/PUT /dapps/1.json
  def update
    respond_to do |format|
      if @dapp.update(dapp_params)
        format.html { redirect_to admin_dapp_path(@dapp), notice: 'Dapp was successfully updated.' }
        format.json { render :show, status: :ok, location: @dapp }
      else
        format.html { render :edit }
        format.json { render json: @dapp.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /dapps/1
  # DELETE /dapps/1.json
  def destroy
    @dapp.destroy
    respond_to do |format|
      format.html { redirect_to admin_dapps_url, notice: 'Dapp was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
  # Use callbacks to share common setup or constraints between actions.
  def set_dapp
    @dapp = Dapp.find(params[:id])
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def dapp_params
    params.require(:dapp).permit(:android_version, :desc, :developer, :end_at, :intro, :ios_version, :logo_url, :marketing_url, :name, :publish_at, :score, :start_at, :url_address)
  end
end
