import React, { FC, useContext, useState, useEffect } from 'react';
import { connect, MapStateToProps } from 'react-redux'
import { CircularProgress, FormControlLabel, Grid, Popover, TextField, Select } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { ChromePicker } from 'react-color';
import { SessionType } from '../../store/user/types';
import { StateType } from '../../store/types';
import SelectedGuildContext from '../../context/SelectedGuild';
import GuildClient from '../../api/discord/clients/GuildClient';
import { DiscordGuildType } from '../../api/discord/response/GuildResponse';
import { getGuildByName } from '../../api/esoCraftRequest/guilds/endpoints';
import useGet from '../../hooks/useGet';
import Styles from './Configuration.module.scss';

interface GuildFormType {
  name: string;
  webhook: string;

}

interface StateProps {
  session: SessionType;
}

interface OwnProps {}

type Props = StateProps & OwnProps;

const Configuration: FC<Props> = ({ session }) => {
  const selectedGuildContext = useContext(SelectedGuildContext);

  const [discordGuildData, setDiscordGuildData] = useState<DiscordGuildType>();

  useEffect(() => {
    if (session && selectedGuildContext?.discordId) {
      GuildClient.getGuild(`${session.tokenType} ${session.accessToken}`, selectedGuildContext.discordId)
        .then((res) => {
          setDiscordGuildData(res);
        })
        .catch(console.error)
    }
  }, [selectedGuildContext]);

  const guildData = false;
  // const guildData = {
  //   active: false
  //   colors: {header: "#7289da", footer: "#0e0e0e"}
  //   crafterTag: "<@&652727008211501117>"
  //   createdAt: "2019-12-07T04:36:05.762Z"
  //   createdBy: "JukesMcGee"
  //   imageUrl: "https://firebasestorage.googleapis.com/v0/b/eso-craft-request.appspot.com/o/default-guild.png?alt=media"
  //   locale: "en-US"
  //   mnemonic: "demo"
  //   name: "ESO Craft Request Demo"
  //   updatedAt: "2019-12-07T04:36:05.762Z"
  //   webhook: "https://discordapp.com/api/webhooks/652727244787023901/0S0DpkM5qE4_04YTNM37BYwYgErx5ZlgxDXLJWbQwchNO6fWsC6FC2l49qd4skzIHW9x"
  //   website: "https://github.com/agiveygives"
  // }
  // const { data: guildData } = useGet(selectedGuildContext?.name ? getGuildByName(selectedGuildContext.name) : null);

  const { register, handleSubmit, formState: { errors } } = useForm<GuildFormType>({
    mode: 'onChange',
    reValidateMode: 'onBlur',
  });

  return (
    <>
      {
        selectedGuildContext && discordGuildData ? (
          <div>
            <Grid container>
              <Grid item xs={4}>
                <div className={Styles.container}>
                  <img src={selectedGuildContext.iconUrl} />
                </div>
              </Grid>
              <Grid item xs={8} md={4}>
                <form>
                  <div className={Styles.container}>
                    <TextField
                      className={Styles.textField}
                      margin="dense"
                      error={!!errors.name}
                      id="guild-name-input"
                      label="Guild Name"
                      helperText={errors.name}
                      inputProps={{
                        className: Styles.inputField
                      }}
                      variant="outlined"
                      {...register('name', {
                        required: 'A guild name is required.',
                      })}
                    />
                  </div>
                  <div className={Styles.container}>
                    <TextField
                      className={Styles.textField}
                      margin="dense"
                      error={!!errors.webhook}
                      id="webhook-input"
                      label="Discord Webhook"
                      helperText={errors.webhook}
                      inputProps={{
                        className: Styles.inputField
                      }}
                      variant="outlined"
                      {...register('webhook', {
                         required: 'A webhook is required.',
                       })}
                    />
                  </div>
                  <div>
                  </div>
                  <div>
                    {/* <FormControlLabel
                      labelPlacement="start"
                      control={

                      }
                    /> */}
                  </div>
                </form>
              </Grid>
            </Grid>
          </div>
        ) : (
          <div className={Styles.loading}>
            <CircularProgress />
          </div>
        )
      }
    </>
  );
}

const mapStateToProps: MapStateToProps<StateProps, OwnProps, StateType> = state => ({
  session: state.user.session,
});

export default connect(mapStateToProps)(Configuration);
