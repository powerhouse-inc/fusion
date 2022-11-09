import styled from '@emotion/styled';
import React from 'react';
import { CustomButton } from '../../../components/custom-button/custom-button';
import AvatarPlaceholder from '../../../components/svg/avatar-placeholder';
import TextInput from '../../../components/text-input/text-input';
import { Spacer, UserLabel, Username, UserWrapper } from '../change-password/change-password';
import { ButtonWrapper, Container, Wrapper } from '../login/login';

export default () => {
  return (
    <Wrapper>
      <Container>
        <CustomButton
          label="Close"
          style={{
            width: 86,
            height: 34,
            borderRadius: 22,
            position: 'absolute',
            top: 24,
            right: 24,
          }}
        />
        <AvatarPlaceholder />
        <UserWrapper>
          <UserLabel>Username</UserLabel>
          <Spacer />
          <Username>Wouter Kampman</Username>
        </UserWrapper>

        <DeleteLabel>Delete Account</DeleteLabel>
        <WarningLabel>ATTENTION: this action cannot be undone</WarningLabel>

        <InputsWrapper>
          <Label>Enter Password to Delete Account</Label>
          <TextInput type="password" placeholder="Password" name="Password" style={{ marginBottom: 32 }} />
        </InputsWrapper>

        <ButtonWrapper>
          <CustomButton
            label="Delete Account"
            style={{
              width: 151,
              height: 34,
              borderRadius: 22,
            }}
          />
        </ButtonWrapper>
      </Container>
    </Wrapper>
  );
};

const DeleteLabel = styled.h1({
  margin: '0 0 8px 0',
  fontWeight: 600,
  fontSize: 20,
  lineHeight: '24px',
  color: '#434358',
  alignSelf: 'flex-start',
});

const WarningLabel = styled.h1({
  fontWeight: 400,
  fontSize: 16,
  lineHeight: '22px',
  color: '#F75524',
  margin: '0 0 32px 0',
  alignSelf: 'flex-start',
});

const InputsWrapper = styled.div({
  width: '100%',
  marginBottom: 0,
  '@media (min-width: 834px)': {
    marginBottom: 32,
  },
});

const Label = styled.div({
  fontWeight: 400,
  fontSize: 14,
  lineHeight: '22px',
  color: '#231536',
  marginBottom: 16,
});
