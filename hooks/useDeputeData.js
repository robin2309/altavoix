import { useReducer, useCallback } from 'react';

const initialState = { data: null, isLoading: false };

const GET_DEPUTE_PENDING = 'useDeputes/GET_DEPUTE_PENDING';
const GET_DEPUTE_FULFILLED = 'useDeputes/GET_DEPUTE_FULFILLED';
const GET_DEPUTE_ERROR = 'useDeputes/GET_DEPUTE_ERROR';

const getDeputePendingAction = () => {
  return {
    type: GET_DEPUTE_PENDING,
  };
};

const getDeputeFulfilledAction = payload => {
  return {
    type: GET_DEPUTE_FULFILLED,
    payload,
  };
};

const getDeputeErrorAction = () => {
  return {
    type: GET_DEPUTE_ERROR,
  };
};

const reducer = (state, action) => {
  switch(action.type) {
    case GET_DEPUTE_PENDING: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case GET_DEPUTE_FULFILLED: {
      return {
        ...state,
        isLoading: false,
        data: action.payload,
      };
    }
    case GET_DEPUTE_ERROR: {
      return {
        ...state,
        isLoading: false,
      };
    }
  };
  return state;
};

const useDeputeData = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getDeputeData = async (name) => {
    try {
      dispatch(getDeputePendingAction());
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_HOST}/api/depute?name=${encodeURIComponent(name)}`
      );
      const data = await response.json();
      dispatch(getDeputeFulfilledAction(data));
    } catch (error) {
      console.error('Error fetching deputy data:', error);
      dispatch(getDeputeErrorAction());
    }
  };

  return {
    getDeputeData: useCallback(getDeputeData, []),
    isLoading: state.isLoading,
    data: state.data,
  };
}

export { useDeputeData };